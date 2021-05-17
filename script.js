//when submit is clicked, get the id of the input. then get the value of that. then console log it
//make sure form is not being refreshed

document.getElementById("left_form").addEventListener("submit", handleSubmit);

function consoleLogInput(event) {
  event.preventDefault();

  const destinationLog = document.getElementById("destination").value;
  const locationLog = document.getElementById("location").value;
  const descriptionLog = document.getElementById("description").value;

  console.log(destinationLog, locationLog, photoLog, descriptionLog);

  resetValues();
}

function handleSubmit(e) {
  e.preventDefault();

  const userDestinationInput = document.getElementById("destination").value;
  const userLocationInput = document.getElementById("location").value;
  let url =
    "https://api.unsplash.com/search/photos/?query=" +
    userDestinationInput +
    "%20" +
    userLocationInput +
    "&client_id=hlKxc2FU2gi-xIya9DZXnOjxfV1zNk9DE36J1lILiAc";

  fetch(url)
    .then((response) => response.json())
    .then((pictures) => addPictures(pictures.results));
}

function addPictures(pictures) {
  //const element = event.target;

  const random = Math.floor(Math.random() * pictures.length);

  const photoURL = pictures[random].urls.thumb;

  const userDestinationInput = document.getElementById("destination").value;
  const userLocationInput = document.getElementById("location").value;
  const userDescriptionInput = document.getElementById("description").value;

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-body">
    <img class="card-img-top" src=${photoURL}>
      <h5 class="card-title">${userDestinationInput}</h5>
      <p class="card-text">${userLocationInput}</p>
      <p class="card-text">${userDescriptionInput}</p>
      <button class="btn btn-warning" btn-type="edit">Edit</button>
      <button class="btn btn-danger" btn-type="delete">Delete</button>
    </div>
  `;

  document.getElementById("wishlist_container").appendChild(card);

  //reset the value to "" every submit so users wont have to delete previous inputs
  resetValues();

  /* const destinationString = element.destination_name.value;
  const locationString = element.location_name.value;
  const descriptionString = element.description_name.value;

  const defaultPhotoURL =
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80";

  const outputCard = document.createElement("div");
  outputCard.classList.add("card");
  outputCard.style.width = "13rem";

  outputCard.innerHTML = `
  <img src=${defaultPhotoURL}>
  <div class="card-body">
    <h5 class="card-title">${destinationString}</h5>
    <p class="card-text">${locationString}</p>
    <p class="card-text">${descriptionString}</p>
    <button btn-type="edit" class="btn btn-warning">Edit</button>
    <button btn-type="delete" class="btn btn-danger">Delete</button>
  </div>
    `;

  document.getElementById("wishlist_container").appendChild(outputCard);

  resetValues();

  //handle reset and edit button

  document
    .getElementById("wishlist_container")
    .addEventListener("click", editOrDelete);
    */
}

//handles delete button
document
  .getElementById("wishlist_container")
  .addEventListener("click", function (e) {
    const element = e.target;

    if (element.getAttribute("btn-type") === "delete") {
      element.parentElement.parentElement.remove();
    }
  });

//handles delete
document
  .getElementById("wishlist_container")
  .addEventListener("click", function (e) {
    const element = e.target;

    if (element.getAttribute("btn-type") === "edit") {
      handleEdit();
    }
  });

//handle edit
function handleEdit(e) {
  const newDestination = prompt("Enter new destination");
  const newLocation = prompt("Enter new location");
  const newDescription = prompt("Enter new description");

  let url =
    "https://api.unsplash.com/search/photos/?query=" +
    newDestination +
    "%20" +
    newLocation +
    "&client_id=hlKxc2FU2gi-xIya9DZXnOjxfV1zNk9DE36J1lILiAc";

  fetch(url)
    .then((response) => response.json())
    .then((pictures) => editCard(pictures.results));
}

function editCard(pictures) {
  console.log(pictures);
  // const oldPhoto = element.parentElement.children[0];
  // const oldDestination = element.parentElement.children[1];
  // const oldLocation = element.parentElement.children[2];
  // const oldDescription = element.parentElement.children[3];

  // if (newDestination !== "") {
  //   oldDestination.innerHTML = newDestination;
  // }
  // if (newLocation !== "") {
  //   oldLocation.innerHTML = newLocation;
  // }
  // if (newDescription !== "") {
  //   oldDescription.innerHTML = newDescription;
  // }

  // //need to do another api request here. not sure how
  // oldPhoto.src = url;
}

function resetValues() {
  document.getElementById("destination").value = "";
  document.getElementById("location").value = "";
  document.getElementById("description").value = "";
}

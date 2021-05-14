//when submit is clicked, get the id of the input. then get the value of that. then console log it
//make sure form is not being refreshed

document.getElementById("left_form").addEventListener("submit", addCards);

function consoleLogInput(event) {
  event.preventDefault();

  const destinationLog = document.getElementById("destination").value;
  const locationLog = document.getElementById("location").value;
  const photoLog = document.getElementById("photo").value;
  const descriptionLog = document.getElementById("description").value;

  console.log(destinationLog, locationLog, photoLog, descriptionLog);

  resetValues();
}

function addCards(event) {
  event.preventDefault();

  const element = event.target;

  const destinationString = element.destination_name.value;
  const locationString = element.location_name.value;
  let photoURL = element.photo_name.value;
  const descriptionString = element.description_name.value;

  if (photoURL == "") {
    photoURL =
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80";
  }

  const outputCard = document.createElement("div");
  outputCard.classList.add("card");
  outputCard.style.width = "13rem";

  outputCard.innerHTML = `
  <img src=${photoURL}>
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
}

function editOrDelete(e) {
  const element = e.target;

  if (element.getAttribute("btn-type") === "delete") {
    element.parentElement.parentElement.remove();
  } else if (element.getAttribute("btn-type") === "edit") {
    editCard(e);
  }
}

function editCard(e) {
  const element = e.target;

  const newDestination = prompt("Enter new destination");
  const newLocation = prompt("Enter new location");
  const newPhotoURL = prompt("Enter new photo URL");
  const newDescription = prompt("Enter new description");

  const oldDestination = element.parentElement.children[0];
  const oldLocation = element.parentElement.children[1];
  const oldPhotoURL = element.parentElement.parentElement.children[0];
  const oldDescription = element.parentElement.children[2];

  if (newDestination !== "") {
    oldDestination.innerHTML = newDestination;
  }
  if (newLocation !== "") {
    oldLocation.innerHTML = newLocation;
  }
  if (newPhotoURL !== "") {
    oldPhotoURL.setAttribute("src", newPhotoURL);
  }
  if (newDescription !== "") {
    oldDescription.innerHTML = newDescription;
  }
}

function resetValues() {
  document.getElementById("destination").value = "";
  document.getElementById("location").value = "";
  document.getElementById("photo").value = "";
  document.getElementById("description").value = "";
}

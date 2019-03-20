const URL = "http://localhost:3000/burgers";

document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  renderAllBurgers();

  const form = document.getElementById("custom-burger");
  form.addEventListener("submit", handleFormSubmit);
});

function getAllBurgers() {
  return fetch(URL).then(response => response.json());
}

function getBurger(id) {
  return fetch(`${URL}/${id}`).then(response => response.json());
}

function renderAllBurgers() {
  const container = document.getElementById("burger-menu");
  container.innerHTML = "";

  getAllBurgers().then(burgers => burgers.forEach(renderBurger));
}

function renderBurger(burger) {
  const container = document.getElementById("burger-menu");

  const div = document.createElement("div");
  div.className = "burger";
  container.appendChild(div);

  const header = document.createElement("h3");
  header.className = "burger_title";
  header.innerText = burger.name;
  div.appendChild(header);

  const image = document.createElement("img");
  image.src = burger.image;
  div.appendChild(image);

  const p = document.createElement("p");
  p.className = "burger_description";
  p.innerText = burger.description;
  div.appendChild(p);

  const addButton = document.createElement("button");
  addButton.className = "button";
  addButton.innerText = "Add To Order";
  addButton.dataset.id = burger.id;
  addButton.addEventListener("click", handleAddBurger);
  div.appendChild(addButton);
}

function handleAddBurger(e) {
  // console.log(e.target);
  const id = e.target.dataset.id;

  getBurger(id).then(burger => {
    // console.log(burger)
    const list = document.getElementById("order-list");

    const item = document.createElement("li");
    item.innerText = burger.name;
    list.appendChild(item);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  // console.log(e.target)

  // const name =
  // const description =
  // const image =

  const data = {
    name: e.target.elements["burger-name"].value,
    description: e.target.elements["burger-description"].value,
    image: e.target.elements["burger-image"].value
  };

  postBurger(data)
  e.target.reset();
  // console.log(data);
}

function postBurger(data) {
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(renderAllBurgers)
}

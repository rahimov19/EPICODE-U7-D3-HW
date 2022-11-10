async function getBooks() {
  const response = await fetch("https://striveschool-api.herokuapp.com/books");
  const listOfBooks = await response.json();
  listOfAllBooks = listOfBooks;
  return listOfBooks;
}
let listOfAllBooks = [];
window.onload = async () => {
  const listOfBooks = await getBooks();
  showBooks(listOfBooks);
};

let cardsDiv = document.querySelector("#books");
let showBooks = function (listOfBooks) {
  listOfBooks.forEach((book) => {
    let createCard = document.createElement("div");
    createCard.innerHTML = `<div class="card" style="width: 15rem;">
        <img src="${book.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">${book.category}</p>
          <button class="btn btn-primary" onclick="addToCart(event)">Add to cart</button>
          <button class="btn btn-secondary" onclick="skipBook(event)">Skip</button>

        </div>
      </div>`;
    cardsDiv.appendChild(createCard);
  });
};

let cartList = document.querySelector("#cart-list");
let addToCart = function (event) {
  let selectedTitle = event.currentTarget.closest(".card");
  selectedTitle.className = "card selected";
  let createLi = document.createElement("li");
  createLi.className = "col-4";
  createLi.innerHTML = selectedTitle.innerHTML;
  cartList.appendChild(createLi);
  createLi.querySelector("div :nth-child(3)").remove();
  let deleteButton = createLi.querySelector("div :nth-child(3)");
  deleteButton.innerText = "Delete";
  deleteButton.className = "btn btn-danger";
  deleteButton.addEventListener("click", function (event) {
    event.currentTarget.closest(".col-6").remove();
    selectedTitle.className = "card";
  });
};
let skipBook = function (event) {
  let selectedTitle = event.currentTarget.closest(".card");
  selectedTitle.remove();
};
let clearCart = function () {
  cartList.innerHTML = "";
  let allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.className = "card";
  });
};
let clearButton = document.querySelector("#clearCart");
clearButton.addEventListener("click", clearCart);
let filteredBooks = [];
let searchBook = function (query) {
  if (query.length > 3) {
    filteredBooks = listOfAllBooks.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    cardsDiv.innerHTML = "";
    showBooks(filteredBooks);
  } else {
    cardsDiv.innerHTML = "";
    showBooks(listOfAllBooks);
  }
};

const BACKEND_URL = 'http://localhost:3000/';
const listCart = document.getElementById("listCart");
const messageCart = document.getElementById("messageCart");
const ulListCart = document.getElementById("ulListCart");
const totalPrice = document.getElementById("totalPrice");

async function getAllTripInCart() {
    try {
      const response = await fetch(`${BACKEND_URL}cart`);
      const cart = await response.json();
  
      if(cart.result) {
        getTotalPrice(cart.trips);
        listCart.classList.remove("invisible");
        messageCart.classList.add("invisible");
  
        for(const cartTrip of cart.trips) {
          const date = cartTrip.date;
          const formattedDate = moment(date).format("DD-MM-YYYY");
          const formattedTime = moment(date).format("HH:mm");
  
          ulListCart.innerHTML += `
            <li class="list-group-item">
              <div class="d-flex justify-content-between">
                <p>${cartTrip.departure} > ${cartTrip.arrival}</p>
                <p>${formattedDate}</p>
                <p>${formattedTime}</p>
                <p>${cartTrip.price} €</p>
                <button class="btn btn-danger supprCart" id="${cartTrip._id}"> X </button>
              </div>
            </li>
          `;       
        }
      }
    } catch(error) {
      console.error("Erreur lors de la recherche :", error);
    }
  }

  async function getTotalPrice(responseCart) {
    var price = 0;
    for(const cartTrip of responseCart) {
        price += cartTrip.price;
        console.log(price);
    }
    totalPrice.innerText = `Prix total : ${price} €`;
  }

  getAllTripInCart();
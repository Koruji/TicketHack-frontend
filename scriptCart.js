const BACKEND_URL = 'https://ticket-hack-backend-three.vercel.app/';
const listCart = document.getElementById("listCart");
const messageCart = document.getElementById("messageCart");
const ulListCart = document.getElementById("ulListCart");
const totalPrice = document.getElementById("totalPrice");
const purchaseButton = document.getElementById("purchase");

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
          
          //logique de suppression de voyage du panier
            const deleteButton = document.querySelectorAll('.supprCart');

            deleteButton.forEach(button => {
                button.addEventListener('click', async () => {
                    const tripId = button.id;
                    
                    try {
                        const res = await fetch(`${BACKEND_URL}cart/${tripId}`, {
                          method: 'POST',
                        });
                        const data = await res.json();
          
                        if (data.result) {
                          window.location.reload();
                        } else {
                          alert(data.message || "Problème lors de la suppression de l'élément");
                        }
                      } catch (err) {
                        console.error(err);
                      }
                });
            });
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

async function purchaseAllTrip() {
    try {
        const cartTrip = await fetch(`${BACKEND_URL}cart`);

        const response = await fetch(`${BACKEND_URL}purchase`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({cartTrip})
        });

        const purchase = await response.json();

        if(purchase.result) {
            console.log("Achat effectué");
        }

    } catch(error) {
        console.error("Erreur lors de la recherche :", error);
    }
}

getAllTripInCart();

purchaseButton.addEventListener("click", async () => {
    await purchaseAllTrip();
    console.log("je clique");
    window.location.reload();
});
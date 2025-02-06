const BACKEND_URL = 'http://localhost:3000/';
const listPurchase = document.getElementById("listPurchase");
const messagePurchase = document.getElementById("messagePurchase");
const ulListPurchase = document.getElementById("ulListPurchase");

async function getAllTripInPurchase() {
    try {
      const response = await fetch(`${BACKEND_URL}purchase`);
      const purchase = await response.json();
  
      if(purchase.result) {
        listPurchase.classList.remove("invisible");
        messagePurchase.classList.add("invisible");
  
        for(const purchaseTrip of purchase.trips) { 
            const date = await calculateTime(purchaseTrip.date);
            ulListPurchase.innerHTML += `
                <li class="list-group-item">
                <div class="d-flex justify-content-between">
                    <p>${purchaseTrip.departure} > ${purchaseTrip.arrival}</p>
                    <p>${purchaseTrip.price} €</p>
                    <p>${date}</p>
                    <p></p>
                </div>
                </li>
            `;       
        }
      }
    } catch(error) {
      console.error("Erreur lors de la recherche :", error);
    }
  }

  async function calculateTime(date) {
    const todayDate = moment();
    const tripDate = moment(date); 

    const diff = tripDate.diff(todayDate);

    if (diff <= 0) {
        return "Voyage déjà passé";
    }

    const duration = moment.duration(diff);

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();

    return `Reste ${days} jours et ${hours} heures et ${minutes} minutes avant le départ`;
  }

  getAllTripInPurchase();
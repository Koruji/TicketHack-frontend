const BACKEND_URL = 'http://localhost:3000/';
const resultsSection = document.querySelector('.results-section');
const searchForm = document.querySelector("#search-form");

async function getTripByParams(departure, arrival, date) {
  resultsSection.innerHTML = ""; //remise a zéro des recherches précédentes 
  try {
    const response = await fetch(`${BACKEND_URL}trips?departure=${departure}&arrival=${arrival}&date=${date}`);
    const trips = await response.json();

    if(trips.result) {
      for(const trip of trips.trips) {
        const date = trip.date;
        const formattedDate = moment(date).format("DD-MM-YYYY");
        const formattedTime = moment(date).format("HH:mm");

        resultsSection.innerHTML += `
          <div class="trajet-result">
            <p>Départ : <span class="departure-city">${trip.departure}</span></p>
            <p>Arrivée : <span class="arrival-city">${trip.arrival}</span></p>
            <p>Date : <span class="date">${formattedDate}</span></p>
            <p>Heure de départ : <span class="price">${formattedTime}</span></p>
            <button class="book btn btn-danger" id="${trip._id}">Ajouter au panier</button>
          </div>
        `;
      }
    } else {
      resultsSection.innerHTML = `<img class="d-flex justify-content-center w-25" src="./images/notfound.png">`;
    }
  } catch(error) {
    console.error("Erreur lors de la recherche :", error);
  }
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const departure = document.querySelector("#departure").value.trim();
  const arrival = document.querySelector("#arrival").value.trim();
  const date = document.querySelector("#date").value; 

  if (!departure || !arrival || !date) {
    alert("Merci de remplir tous les champs (Départ, Arrivée, Date).");
    return;
  }

  getTripByParams(departure, arrival, date);
});
  
  
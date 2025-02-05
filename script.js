document.querySelector("#search-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const departure = document.querySelector("#departure").value.trim();
    const arrival = document.querySelector("#arrival").value.trim();
    const date = document.querySelector("#date").value; 
  
    if (!departure || !arrival || !date) {
      alert("Merci de remplir tous les champs (Départ, Arrivée, Date).");
      return;
    }
  
    fetch("http://localhost:3000/", {
      method: "GET",        
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ departure, arrival, date }), 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const resultsSection = document.querySelector(".results-section");
          resultsSection.innerHTML = "<h2>Résultats</h2>"; 
          data.trips.forEach((trip) => {
            resultsSection.innerHTML += `
              <div class="trajet-result">
                <p>Départ: <span class="departure-city">${trip.departure}</span></p>
                <p>Arrivée: <span class="arrival-city">${trip.arrival}</span></p>
                <p>Date: <span class="date">${trip.date}</span></p>
                <p>Heure: <span class="time">${trip.time}</span></p>
                <p>Prix: <span class="price">${trip.price}€</span></p>
                <button class="btn-add-cart" data-departure="${trip.departure}" data-arrival="${trip.arrival}" data-date="${trip.date}" data-time="${trip.time}" data-price="${trip.price}">Ajouter au panier</button>
              </div>`;
          });
  
          activateAddToCart();
        } else {
          alert("Aucun trajet trouvé pour ces critères.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche :", error);
      });
  });
  
  
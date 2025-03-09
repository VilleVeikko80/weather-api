document.addEventListener("DOMContentLoaded", function () {
  //fetch("https://weather-api-thpb.onrender.com/weather?city=Oulu")
  fetch("http://localhost:3000/weather?city=Oulu")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Verkkovastaus ei ollut kunnossa: " + response.statusText
        );
      }
      return response.json();
    })

    .then((data) => {
      document.getElementById("description").textContent = data.description;
      document.getElementById("temperature").textContent =
        data.temperature.toFixed(2);
      document.getElementById("pressure").textContent = data.pressure;
      document.getElementById("humidity").textContent = data.humidity;
      document.getElementById("speed").textContent = data.wind_speed;
      document.getElementById("deg").textContent = data.wind_deg;

      // Asetetaan sääikoni
      document.getElementById("weatherIcon").src =
        "https://openweathermap.org/img/wn/" + data.icon + ".png";
      document.getElementById("weatherIcon").alt = data.description;

      // Muunnetaan UNIX-aikaleimat tavallisiksi päivämääriksi
      const sunrise = new Date(data.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.sunset * 1000).toLocaleTimeString();
      document.getElementById("sunrise").textContent = sunrise;
      document.getElementById("sunset").textContent = sunset;

      // Näytetään suositus steisella säällä
      if (data.weather_main === "Rain") {
        document.getElementById("advice").textContent =
          "Otahan sateenvarjo mukaan!";
      }
    })

    .catch((error) => console.error("Error fetching weather:", error));
});

//Funktio, joka asettaa nykyisen päivämäärän HTML-sivuun
function showCurrentDate() {
  const dateElement = document.getElementById("currentDay");
  const timeElement = document.getElementById("currentTime");

  // Haetaan nykyinen päivämäärä
  const today = new Date();

  // Muotoillaan tyliin: Sunnuntai 9. maaliskuu 2025
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let formattedDate = today.toLocaleDateString("fi-FI", options);

  // Tehdään viikonpäivän ensimmäinen kirjain isoksi
  formattedDate =
    formattedDate.charAt(0).toLocaleUpperCase() + formattedDate.slice(1);

  // Haetaan kellonaika muodossa HH.MM
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const formattedTime = today.toLocaleTimeString("fi-FI", timeOptions);

  dateElement.textContent = formattedDate;
  timeElement.textContent = `klo ${formattedTime}`;
}
// Kutsu funktiota, kun sivu latautuu
document.addEventListener("DOMContentLoaded", showCurrentDate);

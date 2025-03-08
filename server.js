require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Sallii API-kutsut kaikista lähteistä
app.use(express.json()); // Mahdollistaa JSON-datan käsittelyn

// Testireitti
app.get("/", (req, res) => {
  res.json({ viesti: "Tervetuloa Weather API:iin" });
});

// Säädatan hakeminen OpenWeatherMap API:sta
app.get("/weather", async (req, res) => {
  const city = req.query.city || "Oulu";
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ virhe: "API-avain puuttuu!" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fi`
    );

    res.json({
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      temp_min: response.data.main.temp_min,
      temp_max: response.data.main.temp_max,
      pressure: response.data.main.pressure,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed,
      wind_deg: response.data.wind.deg,
      icon: response.data.weather[0].icon,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
      weather_main: response.data.weather[0].main,
    });
  } catch (error) {
    res.status(500).json({ virhe: "Tietojen hakeminen epäonnistui!" });
  }
});

// Käynnistä palvelin
app.listen(PORT, () => {
  console.log(`Serveri käynnissä portissa ${PORT}`);
});

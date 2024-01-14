import React, { Component } from 'react';

import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';

import { WEATHER_KEY } from './keys';

class App extends Component {

    state = {
        temperature: '',
        description: '',
        humidity: '',
        wind_speed: 0,
        city: '',
        country: '',
        error: null
    };

    getWeatherByLocation = () => {
        console.log("Attempting to get weather by user's location...");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                console.log("Geolocation success:", position);
                const { latitude, longitude } = position.coords;
                const cityName = await this.getCityName(latitude, longitude);
                if (cityName) {
                    console.log(`Found city: ${cityName}. Fetching weather...`);
                    this.getWeather(null, cityName);
                }
            }, (error) => {
                console.error("Error al obtener la geolocalización:", error);
            });
        } else {
            console.error("La geolocalización no está soportada por este navegador.");
        }
    }

    getCityName = async (lat, lon) => {
        console.log(`Getting city name from coordinates: (${lat}, ${lon})`);
        const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_KEY}`;
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data[0].name; // Returns the city name
        } catch (error) {
            console.error("Error al obtener el nombre de la ciudad:", error);
        }
    }

    getWeather = async (e, cityFromLocation = null) => {
        if (e) e.preventDefault();
        let cityValue, countryValue;
        if (cityFromLocation) {
            cityValue = cityFromLocation;
            countryValue = ''; // Assuming country is not needed when city is from location
        } else {
            const { city, country } = e.target.elements;
            cityValue = city.value;
            countryValue = country.value;
        }

        console.log("Fetching weather...");
        if (cityValue) {
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`;
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                this.setState({
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    wind_speed: data.wind.speed,
                    city: data.name,
                    country: data.sys.country,
                    error: null
                });
            } catch (error) {
                console.error("Error fetching weather data:", error);
                this.setState({
                    error: 'Error fetching weather data.'
                });
            }
        } else {
            this.setState({
                error: 'Por favor, introduce una ciudad.'
            });
        }
    }

    render() {
        return (
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <WeatherForm
                            getWeather={this.getWeather}
                            getWeatherByLocation={this.getWeatherByLocation}
                        />
                        <WeatherInfo {...this.state} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
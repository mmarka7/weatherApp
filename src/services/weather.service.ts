import { Injectable } from "@angular/core";
import { City } from "src/interfaces/city.interface";
import { Weather } from "src/interfaces/weather.interface";
import { Forecast, ParsedForecast } from "src/interfaces/forecast.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    private API_KEY = '84c92319657015cac75f1aed37537de7';

    constructor(private http: HttpClient) {}
    
    /**
     * 
     * @param city 
* @returns Observable<Weather>
     */
    public getCurrentWeather(city: City) {
        return this.http.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${this.API_KEY}&units=metric`);
    }

    /**
     * 
     * @param city 
* @returns Observable<Forecast>
     */
    public getForecast(city: City) {
        return this.http.get<Forecast>(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${this.API_KEY}&units=metric`);
    }

    /**
     * 
     * @param forecast 
     * @returns ParsedForecast
     * Parsing the forecast data
     * for display on the GUI
     */
    public getParsedForecast(forecast: Forecast): ParsedForecast {
        let parsedForecast: ParsedForecast = {};
        let id: number = 0;

        forecast.list.forEach(day => {

            let date: string = day.dt_txt.split(' ')[0];

            if (date in parsedForecast) {
                parsedForecast[date].high = Math.round(parsedForecast[date].high < day.main.temp_max ? day.main.temp_max : parsedForecast[date].high);
                parsedForecast[date].low = Math.round(parsedForecast[date].low > day.main.temp_min ? day.main.temp_min : parsedForecast[date].low);
            } else {

                parsedForecast[date] = {
                    high: Math.round(day.main.temp_max),
                    low: Math.round(day.main.temp_min),
                    iconId: day.weather[0].id,
                    id: id
                }

                id++;
            }
        });

        return parsedForecast;
    }
}
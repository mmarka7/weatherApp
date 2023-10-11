import { Component } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { City } from 'src/interfaces/city.interface';
import { WeatherService } from 'src/services/weather.service';
import { Weather } from 'src/interfaces/weather.interface';
import { Forecast, ParsedForecast } from 'src/interfaces/forecast.interface';
import cities from 'src/app/static/cities-fr.json';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  public currentWeather: Weather;
  public forecast: ParsedForecast;
  public selectedValue: string;
  public loading: boolean = false;
  public options: City[] = cities;

  constructor(private weatherService: WeatherService) {
    /**
     * On load, select the first city
     * and show the weather data
     */
    this.selectedValue = cities[0].nm;
    this.showWeatherData();
  }

  /**
   * Getting the weather and forecast info
   * from the open weather APIs
   */
  public showWeatherData() {
    this.loading = true;
    let selectedOption = this.options.find((option: City) => option.nm === this.selectedValue);
    
    if (!selectedOption) {
      selectedOption = cities[0];
    }

    let weatherApis = [
      this.weatherService.getCurrentWeather(selectedOption),
      this.weatherService.getForecast(selectedOption)
    ];

    forkJoin(weatherApis)
      .pipe(
        map((result: (Weather|Forecast)[]) => {
          let parsedResults: (Weather | ParsedForecast)[] = [];
          let weather = result[0] as Weather;

          weather.main.temp = Math.round(weather.main.temp);
          parsedResults.push(weather);
          parsedResults.push(this.weatherService.getParsedForecast(result[1] as Forecast));
          
          return parsedResults;
        })
      )
      .subscribe((result: (Weather | ParsedForecast)[]) => {
        this.currentWeather = result[0] as Weather;
        this.forecast = result[1] as ParsedForecast;
        this.loading = false;
      });
  }
}

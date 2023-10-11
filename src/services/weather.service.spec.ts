import { TestBed } from "@angular/core/testing";
import { WeatherService } from "./weather.service";
import { HttpClient } from "@angular/common/http";
import { City } from "src/interfaces/city.interface";
import { Weather } from "src/interfaces/weather.interface";
import { of } from "rxjs/internal/observable/of";
import { Forecast } from "src/interfaces/forecast.interface";
import weatherStubJson from 'src/app/static/stubs/weather-stub.json';
import forecastStubJson from 'src/app/static/stubs/forecast-stub.json';

describe('WeatherService', () => {

    let city: City = {
        "id":3027260,
        "nm":"Champagne",
        "lat":48.021851,
        "lon":0.33096
    }

    let weatherStub: Weather = weatherStubJson;

    let forecastStub: Forecast = forecastStubJson;

    let weatherService: WeatherService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('HttpClient', ['get']);

        TestBed.configureTestingModule({
            providers: [
                WeatherService,
                { 
                    provide: HttpClient, 
                    useValue: spy 
                }
            ]
        });
        
        weatherService = TestBed.inject(WeatherService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    });

    it('#getCurrentWeather should return stubbed value from a spy', () => {

        httpClientSpy.get.and.returnValue(of(weatherStub));
        
        weatherService.getCurrentWeather(city).subscribe(result => {
            expect(result).toBe(weatherStub);
        });
    });

    it('#getForecast should return stubbed value from a spy', () => {

        httpClientSpy.get.and.returnValue(of(forecastStub));
        
        weatherService.getForecast(city).subscribe(result => {
            expect(result).toBe(forecastStub);
        });
    });

    it('#getParsedForecast should be an object', () => {       
        expect(weatherService.getParsedForecast(forecastStub)).toEqual(jasmine.any(Object));
    });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from 'src/services/weather.service';
import { FormsModule } from '@angular/forms';
import cities from 'src/app/static/cities-fr.json';
import { of } from 'rxjs/internal/observable/of';
import weatherStubJson from 'src/app/static/stubs/weather-stub.json';
import forecastStubJson from 'src/app/static/stubs/forecast-stub.json';

describe('WeatherComponent', () => {

  let cityList = cities;

  let component: WeatherComponent;
  let weatherServiceSpy: any;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('WeatherService', ['getCurrentWeather', 'getForecast', 'getParsedForecast']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [WeatherComponent],
      providers: [
        { 
              provide: WeatherService, 
              useValue: spy 
          }
      ]
    });

    weatherServiceSpy = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the showWeatherData function on load', () => {
      spyOn(WeatherComponent.prototype, 'showWeatherData');
      var k = new WeatherComponent(weatherServiceSpy);
      expect(WeatherComponent.prototype.showWeatherData).toHaveBeenCalled();
  });

  it('should load the first city in the list', () => {
    expect(component.selectedValue).toEqual(cityList[0].nm);
  });

  it('should set the weather data from fork join', () => {

    weatherServiceSpy.getCurrentWeather.and.returnValue(of(weatherStubJson));
    weatherServiceSpy.getForecast.and.returnValue(of(forecastStubJson));

    fixture.detectChanges();
    component.showWeatherData();

    expect(component.currentWeather).toBe(weatherStubJson);
    expect(component.loading).toBe(false);

    expect(weatherServiceSpy.getCurrentWeather).toHaveBeenCalled();
    expect(weatherServiceSpy.getForecast).toHaveBeenCalled();
    expect(weatherServiceSpy.getParsedForecast).toHaveBeenCalled();
  });

});

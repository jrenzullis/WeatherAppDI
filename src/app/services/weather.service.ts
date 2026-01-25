import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WeatherResponse, ForecastResponse, GeoLocationResponse } from '../interfaces/weather.interface';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private apiKey = environment.openWeatherApiKey;
    private apiUrl = environment.openWeatherUrl;
    private geoUrl = 'https://api.openweathermap.org/geo/1.0';

    constructor(private http: HttpClient) { }

    getCurrentWeather(lat: number, lon: number): Observable<WeatherResponse | any> {
        return this.http.get<WeatherResponse>(`${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`)
            .pipe(
                timeout(5000),
                catchError(err => {
                    console.error('API Error, using mock data', err);
                    return of(this.getMockCurrentWeather());
                })
            );
    }

    getForecast(lat: number, lon: number): Observable<ForecastResponse | any> {
        return this.http.get<ForecastResponse>(`${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`)
            .pipe(
                timeout(5000),
                catchError(err => {
                    console.warn('API Error, using mock forecast', err);
                    return of(this.getMockForecast());
                })
            );
    }

    getCoordinates(city: string): Observable<GeoLocationResponse[]> {
        return this.http.get<GeoLocationResponse[]>(`${this.geoUrl}/direct?q=${city}&limit=1&appid=${this.apiKey}`)
            .pipe(
                timeout(5000),
                catchError(() => {
                    return of([{
                        name: city,
                        lat: 40.4168,
                        lon: -3.7038,
                        country: 'ES'
                    }]);
                })
            );
    }

    private getMockCurrentWeather(): any {
        return {
            weather: [{ id: 800, main: 'Clear', description: 'cielo claro', icon: '01d' }],
            main: { temp: 24, feels_like: 26, temp_min: 20, temp_max: 28, pressure: 1012, humidity: 45 },
            wind: { speed: 5.5, deg: 180 },
            sys: { country: 'ES', sunrise: 1600000000, sunset: 1600040000 },
            name: 'Madrid (Mock)',
            dt: Date.now() / 1000
        };
    }

    private getMockForecast(): any {
        // Generate simple mock forecast
        const list = [];
        const now = new Date();
        // Start from next hour
        now.setMinutes(0, 0, 0);

        for (let i = 0; i < 40; i++) {
            const date = new Date(now);
            date.setHours(now.getHours() + (i * 3));
            list.push({
                dt: Math.floor(date.getTime() / 1000),
                dt_txt: date.toISOString().replace('T', ' ').substring(0, 19),
                main: { temp: 22 + (i % 5), temp_min: 18, temp_max: 25, humidity: 50 },
                weather: [{ description: 'dispersas nubes', icon: '02d' }],
                wind: { speed: 3 }
            });
        }
        return { list, city: { name: 'Madrid (Mock)', country: 'ES' } };
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherResponse, ForecastResponse, GeoLocationResponse } from '../interfaces/weather.interface';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private apiKey = environment.openWeatherApiKey;
    private apiUrl = environment.openWeatherUrl; // e.g., 'https://api.openweathermap.org/data/2.5'
    private geoUrl = 'https://api.openweathermap.org/geo/1.0';

    constructor(private http: HttpClient) { }

    // Get current weather by lat/lon
    getCurrentWeather(lat: number, lon: number): Observable<WeatherResponse> {
        return this.http.get<WeatherResponse>(`${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`);
    }

    // Get 5 day / 3 hour forecast by lat/lon
    getForecast(lat: number, lon: number): Observable<ForecastResponse> {
        return this.http.get<ForecastResponse>(`${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=es`);
    }

    // Get coordinates by city name
    getCoordinates(city: string): Observable<GeoLocationResponse[]> {
        return this.http.get<GeoLocationResponse[]>(`${this.geoUrl}/direct?q=${city}&limit=5&appid=${this.apiKey}`);
    }

    // Get UV Index (One Call API 3.0 or separate endpoint? Standard free tier doesn't have simple UV endpoint anymore without OneCall)
    // Workaround: OneCall 2.5 is deprecated. OneCall 3.0 requires subscription.
    // We can try to get UV from 'uvi' endpoint if available or omit if strict free tier. 
    // However, request asked for UV. Let's try OneCall 2.5 endpoint just in case it still works for this key, or skip if 401. 
    // For now, I'll stick to basic. If user *really* needs UV and doesn't have OneCall, we can mock or mention limitation.
    // Actually, standard Weather API does NOT return UV. 
    // I will add a method for OneCall but note it might fail without sub.
    getOneCall(lat: number, lon: number): Observable<any> {
        // Excluding minutely,hourly,alerts to save data if possible, but we want hourly for today.
        return this.http.get<any>(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${this.apiKey}&units=metric&lang=es`);
    }
}

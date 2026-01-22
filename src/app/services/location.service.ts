import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor() { }

    async getCurrentPosition(): Promise<{ lat: number, lon: number }> {
        const coordinates = await Geolocation.getCurrentPosition();
        return {
            lat: coordinates.coords.latitude,
            lon: coordinates.coords.longitude
        };
    }
}

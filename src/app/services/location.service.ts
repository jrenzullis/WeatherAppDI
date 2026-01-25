import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor() { }

    async getCurrentPosition(): Promise<{ lat: number, lon: number }> {
        // Platform check:
        // - TRUE for Android/iOS (Skip GPS to avoid TV Box hang) -> Hardcoded Madrid
        // - FALSE for Web (Safe to use HTML5 Geo) -> Real Geolocation
        const isNative = Capacitor.isNativePlatform();

        if (isNative) {
            // NATIVE APP (TV Box): Force Madrid to prevent hangs
            console.log('Native Platform: Using Hardcoded Fallback (Madrid)');
            return { lat: 40.4168, lon: -3.7038 };
        } else {
            // WEB: Try HTML5 Geolocation (Standard & Safe)
            try {
                return await this.getHtml5Position();
            } catch (e) {
                console.warn('HTML5 Geolocation failed on Web, falling back to IP/Madrid...', e);
                return await this.getIpLocation();
            }
        }
    }

    private getCapacitorPosition(): Promise<{ lat: number, lon: number }> {
        return new Promise(async (resolve, reject) => {
            const timeoutMs = 5000; // Short timeout for TV Box
            const timeout = setTimeout(() => reject('Capacitor Timeout'), timeoutMs);

            try {
                const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: false });
                clearTimeout(timeout);
                resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            } catch (err) {
                clearTimeout(timeout);
                reject(err);
            }
        });
    }

    private getHtml5Position(): Promise<{ lat: number, lon: number }> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) return reject('No HTML5 Geo');
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                (err) => reject(err),
                { timeout: 5000, enableHighAccuracy: false }
            );
        });
    }

    private async getIpLocation(): Promise<{ lat: number, lon: number }> {
        try {
            // Using ipapi.co (free tier, no key needed for low usage)
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            if (data.latitude && data.longitude) {
                return { lat: data.latitude, lon: data.longitude };
            }
            throw new Error('Invalid IP data');
        } catch (e) {
            console.error('IP Location failed', e);
            // Last resort: Madrid
            return { lat: 40.4168, lon: -3.7038 };
        }
    }
}

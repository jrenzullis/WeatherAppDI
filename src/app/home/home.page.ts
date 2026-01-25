import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular'; // Import IonicModule or specific components
import { IonContent, IonHeader, IonToolbar, IonRefresher, IonRefresherContent, IonLabel } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { WeatherService } from '../services/weather.service';
import { LocationService } from '../services/location.service';
import { MoleculeSearchBarComponent } from '../components/molecules/molecule-search-bar/molecule-search-bar.component';
import { OrganismCurrentWeatherComponent } from '../components/organisms/organism-current-weather/organism-current-weather.component';
import { OrganismForecastListComponent } from '../components/organisms/organism-forecast-list/organism-forecast-list.component';
import { WeatherResponse, ForecastResponse } from '../interfaces/weather.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, IonContent, IonHeader, IonToolbar, IonRefresher, IonRefresherContent, IonLabel,
    MoleculeSearchBarComponent, OrganismCurrentWeatherComponent, OrganismForecastListComponent],
})
export class HomePage implements OnInit {
  currentWeather: WeatherResponse | null = null;
  dailyForecast: any[] = [];
  todayHourly: any[] = [];

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    this.loadCurrentLocationWeather();
  }

  async loadCurrentLocationWeather() {
    // console.log('DEBUG: Parent received location event');
    // alert('DEBUG: Parent received location event');

    // const loading = await this.loadingCtrl.create({ message: 'Locating...' });
    // await loading.present();

    try {
      // 1. Get Coordinates (Should be instant Madrid now)
      const coords = await this.locationService.getCurrentPosition();
      console.log('DEBUG: Coords received', coords);

      // 2. Fetch Data
      await this.getWeatherData(coords.lat, coords.lon);

    } catch (error) {
      console.error('CRITICAL ERROR', error);
      alert('CRITICAL ERROR: ' + JSON.stringify(error));
    } finally {
      // loading.dismiss();
    }
  }

  async onSearch(city: string) {
    // const loading = await this.loadingCtrl.create({ message: 'Searching...' });
    // await loading.present();

    this.weatherService.getCoordinates(city).subscribe({
      next: async (locations) => {
        if (locations && locations.length > 0) {
          const { lat, lon, name } = locations[0];
          await this.getWeatherData(lat, lon, name);
          // loading.dismiss();
        } else {
          // loading.dismiss();
          this.showToast('ERROR_CITY_NOT_FOUND');
        }
      },
      error: (err) => {
        // loading.dismiss();
        console.error('Search Error', err);
        this.showToast('ERROR_CITY_NOT_FOUND');
      }
    });
  }

  async getWeatherData(lat: number, lon: number, cityName?: string) {
    // Get Current Weather
    this.weatherService.getCurrentWeather(lat, lon).subscribe(data => {
      this.currentWeather = data;
      if (this.currentWeather && cityName) {
        this.currentWeather.name = cityName; // FORCE SEARCHED NAME
      }
    });

    // Get Forecast
    this.weatherService.getForecast(lat, lon).subscribe(data => {
      this.processForecast(data);
    });
  }

  processForecast(data: ForecastResponse) {
    const list = data.list;
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    // 1. Hourly for today / upcoming (Show next 24h -> 8 items of 3h steps)
    this.todayHourly = list.slice(0, 8);

    // 2. Daily for next 4 days
    const grouped = new Map<string, any[]>();
    list.forEach(item => {
      const date = item.dt_txt.split('T')[0];
      if (date !== todayStr) {
        if (!grouped.has(date)) grouped.set(date, []);
        grouped.get(date)?.push(item);
      }
    });

    this.dailyForecast = [];
    let count = 0;
    for (const [date, items] of grouped) {
      if (count >= 4) break;

      // Calc min/max
      let min = 100;
      let max = -100;
      items.forEach(i => {
        if (i.main.temp_min < min) min = i.main.temp_min;
        if (i.main.temp_max > max) max = i.main.temp_max;
      });

      // Pick icon from noon (approx index 4 of 8 items, or middle)
      const midItem = items[Math.floor(items.length / 2)];

      this.dailyForecast.push({
        date: date,
        temp_min: min,
        temp_max: max,
        icon: midItem.weather[0].icon,
        description: midItem.weather[0].description
      });
      count++;
    }
  }

  async showToast(msgKey: string) {
    const toast = await this.toastCtrl.create({
      message: msgKey, // Should translate in template or here. Simple for now.
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  doRefresh(event: any) {
    if (this.currentWeather) {
      this.getWeatherData(this.currentWeather.coord.lat, this.currentWeather.coord.lon).then(() => {
        event.target.complete();
      });
    } else {
      event.target.complete();
    }
  }
}

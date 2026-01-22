import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonText, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { WeatherResponse } from '../../../interfaces/weather.interface';
import { addIcons } from 'ionicons';
import { water, thermometer, cloudy, sunny, rainy, snow, thunderstorm, warning } from 'ionicons/icons';

@Component({
  selector: 'app-organism-current-weather',
  standalone: true,
  imports: [CommonModule, TranslateModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonText, IonGrid, IonRow, IonCol],
  templateUrl: './organism-current-weather.component.html',
  styleUrls: ['./organism-current-weather.component.scss'],
})
export class OrganismCurrentWeatherComponent {
  @Input() weather: WeatherResponse | null = null;

  constructor() {
    addIcons({ water, thermometer, cloudy, sunny, rainy, snow, thunderstorm, warning });
  }

  get weatherIcon(): string {
    // Map OpenWeather icon code to Ionic icon if desired, or use network image
    // OpenWeather provides icon url: http://openweathermap.org/img/wn/{icon}@2x.png
    return `https://openweathermap.org/img/wn/${this.weather?.weather[0]?.icon}@4x.png`;
  }
}

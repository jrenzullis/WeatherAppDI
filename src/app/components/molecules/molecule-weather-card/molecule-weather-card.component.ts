import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, IonNote, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { water, thermometer, cloudy, sunny, rainy, snow, thunderstorm } from 'ionicons/icons';

@Component({
  selector: 'app-molecule-weather-card',
  standalone: true,
  imports: [CommonModule, IonItem, IonNote, IonText],
  templateUrl: './molecule-weather-card.component.html',
  styleUrls: ['./molecule-weather-card.component.scss'],
})
export class MoleculeWeatherCardComponent {
  @Input() date: string = '';
  @Input() tempMin: number = 0;
  @Input() tempMax: number = 0;
  @Input() icon: string = '';
  @Input() description: string = '';

  get iconUrl(): string {
    return `https://openweathermap.org/img/wn/${this.icon}@2x.png`;
  }
}

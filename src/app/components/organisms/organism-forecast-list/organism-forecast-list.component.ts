import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonListHeader, IonLabel } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { MoleculeWeatherCardComponent } from '../../molecules/molecule-weather-card/molecule-weather-card.component';

@Component({
  selector: 'app-organism-forecast-list',
  standalone: true,
  imports: [CommonModule, IonList, IonListHeader, IonLabel, TranslateModule, MoleculeWeatherCardComponent],
  templateUrl: './organism-forecast-list.component.html',
  styleUrls: ['./organism-forecast-list.component.scss'],
})
export class OrganismForecastListComponent {
  @Input() forecastItems: any[] = []; // Processed daily forecast items
}

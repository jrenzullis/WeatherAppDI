import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonSearchbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search, location } from 'ionicons/icons';

@Component({
  selector: 'app-molecule-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, IonSearchbar, IonButton, IonIcon],
  templateUrl: './molecule-search-bar.component.html',
  styleUrls: ['./molecule-search-bar.component.scss'],
})
export class MoleculeSearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  @Output() locationEvent = new EventEmitter<void>();

  searchTerm: string = '';

  constructor() {
    addIcons({ search, location });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.searchEvent.emit(this.searchTerm);
    }
  }

  onLocation() {
    // alert('DEBUG: Button Clicked');
    this.locationEvent.emit();
  }
}

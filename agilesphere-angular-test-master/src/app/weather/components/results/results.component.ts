import { Component, OnChanges , Input} from '@angular/core';
import{Forecast} from '../../models/forecast'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnChanges {
  constructor() { }

  @Input() forecast: Forecast[]

  ngOnChanges() {
    
  }
}



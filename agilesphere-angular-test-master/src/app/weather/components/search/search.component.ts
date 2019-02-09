import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  
  city: string;

  @Output() onSearch = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.city = '';
  }

  search() {
    this.onSearch.emit(this.city);
  }
}

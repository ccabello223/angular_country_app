import { Component, OnInit, inject } from '@angular/core';
import { CountriesServices } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {
  private countriesServices = inject(CountriesServices)
  
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public term: string = ''
  
  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byCapital.countries;
    this.term = this.countriesServices.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesServices.searchCapital(term)
      .subscribe(resp => {
        this.countries = resp;
        this.isLoading = false;
      });
  }
}

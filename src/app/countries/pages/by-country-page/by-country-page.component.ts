import { Component, OnInit, inject } from '@angular/core';
import { CountriesServices } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{
  
  private countriesServices = inject(CountriesServices)
  
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public term: string = ''
  
  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byCountries.countries;
    this.term = this.countriesServices.cacheStore.byCountries.term;
  }

  searchByCountry(term: string): void {
    this.isLoading = true;
    this.countriesServices.searchCountry(term)
      .subscribe(resp => {
        this.countries = resp;
        this.isLoading = false;
      });
  }
}

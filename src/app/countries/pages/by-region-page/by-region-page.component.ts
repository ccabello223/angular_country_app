import { Component, OnInit, inject } from '@angular/core';
import { CountriesServices } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  private countriesServices = inject(CountriesServices)
  
  public countries: Country[] = [];
  public selectedRegion: string = '';
  public isLoading: boolean = false;
  
  public regions = [
    {name: 'Africa',  value: 'africa'  },
    {name: 'America', value: 'americas'},
    {name: 'Asia',    value: 'asia'    },
    {name: 'Europa',  value: 'europe'  },
    {name: 'Oceania', value: 'oceania' }
  ]
  
  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesServices.cacheStore.byRegion.term;
  }

  searchByRegion(term: string): void {
    this.isLoading = true;
    this.selectedRegion = term;
    this.countriesServices.searchRegion(term)
      .subscribe(resp => {
        this.countries = resp;
        this.isLoading = false;
      });
  }
}

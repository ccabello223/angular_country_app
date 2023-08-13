import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesServices } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router)
  private countriesServices = inject(CountriesServices);

  public country?: Country;

  constructor() {}


  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.countriesServices.searchCountryByAlphaCode(id))
    )
    .subscribe( country => {
      if(!country) return this.router.navigateByUrl('')
      return this.country = country;
    })
  }
}

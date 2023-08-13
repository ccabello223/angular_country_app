import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({ providedIn: 'root' })
export class CountriesServices {
  private http = inject(HttpClient)

  private apiUrl = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { term: '', countries: [] },
  }

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountryRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([])),
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountryRequest(url)
      .pipe(
        tap (countries => this.cacheStore.byCapital = {term, countries}),
        tap( () => this.saveToLocalStorage())
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountryRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = {term, countries}),
      tap( () => this.saveToLocalStorage())
    );
  }

  searchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.getCountryRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {term, countries}),
      tap( () => this.saveToLocalStorage())
    );
  }
}
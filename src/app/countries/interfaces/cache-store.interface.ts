import { Country } from "./country.interface";

export interface CacheStore {
    byCapital: TermCountries;
    byCountries: TermCountries;
    byRegion: TermCountries;
}

export interface TermCountries{
    term: string;
    countries: Country[];
}
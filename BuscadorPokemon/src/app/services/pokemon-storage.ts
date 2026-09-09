import { Injectable, inject, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface PokemonTarjeta {
  id: number;
  name: string;
  image: string;
  type: string;
  base_experience: number;
  esFavorito?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonStorageService {
  private http = inject(HttpClient);
  private readonly STORAGE_KEY = 'equipo_pokemon_registrado';

  misPokemones = signal<PokemonTarjeta[]>([]);

  constructor() {
    this.cargarPokemonesDesdeStorage();
  }
  
  private cargarPokemonesDesdeStorage() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.misPokemones.set(JSON.parse(data));
    }
    
  }
}

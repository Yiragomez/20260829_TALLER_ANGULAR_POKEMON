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
   // Buscar un Pokémon en la API 

  buscarEnAPI(nombreOId: string){
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${nombreOId.toLowerCase()}`);
    
  };
  // Guardar un nuevo Pokémon en el almacenamiento

  guardarPokemon(nuevo: PokemonTarjeta){
    const actualizados = [...this.misPokemones(), nuevo];
    this.misPokemones.set(actualizados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));

    
  };
  // Actualizar el estado de favorito de un Pokémon

  actualizarFavorito(id: number, ){
    const actualizados = this.misPokemones().map(poke =>{
      if(poke.id === id){
        return{...poke, esFavorito: !poke.esFavorito}
      }
      return poke;
    });
    this.misPokemones.set(actualizados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));
  };
  // Eliminar un Pokémon del almacenamiento

  eliminarPokemon(id: number){
    const filtrados = this.misPokemones().filter(poke => poke.id !== id);
    this.misPokemones.set(filtrados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtrados));
  }
}
 

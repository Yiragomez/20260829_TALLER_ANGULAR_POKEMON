import { Component, inject, signal} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { PokemonStorageService, PokemonTarjeta} from '../../services/pokemon-storage';


@Component({
  selector: 'app-buscador-pokemon',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './buscador-pokemon.html',
  styleUrl: './buscador-pokemon.css'
})
export class BuscadorPokemon {
  
  pokemonService = inject(PokemonStorageService);

  nombrePokemonInput = signal('');
  pokemon = signal<PokemonTarjeta | null>(null);
  mensajeError = signal<string | null>(null);
  cargando = signal(false);

   buscarPokemon() {

    const nombrePokemon = this.nombrePokemonInput().trim();

    if (!nombrePokemon) return;

    this.cargando.set(true);

    this.mensajeError.set(null);
    this.pokemonService.buscarEnAPI(nombrePokemon).subscribe({
      next: (res) =>{
        this.pokemon.set({
          id: res.id,
          name: res.name.toUpperCase(),
          image: res.sprites.front_default,
          type: res.types[0].type.name,
          base_experience: res.base_experience,
          esFavorito:false
        });
        this.cargando.set(false);
      }, error: () => {
      this.mensajeError.set(null);
      this.mensajeError.set('No se encontró el Pokémon');
      this.cargando.set(false);
    }

  }); 
} 
  guardarEnEquipo() {
    const poke = this.pokemon();
    if (poke) {
      this.pokemonService.guardarPokemon(poke);
      alert(`${poke.name} agregado al almacenamiento exitosamente`);
      this.pokemon.set(null);
    } 
  }
}
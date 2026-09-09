import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PokemonData {
  name: string;
  image: string;
  type: string;
}
 

@Component({
  selector: 'app-buscador-pokemon',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './buscador-pokemon.html',
  styleUrl: './buscador-pokemon.css',
})
export class BuscadorPokemon {
  nombrePokemonInput = signal('');
  pokemon = signal<PokemonData | null>(null);
  mensajeError = signal<string | null>(null);

  async buscarPokemon() {
    const nombrePokemon = this.nombrePokemonInput().toLowerCase().trim();
    if (!nombrePokemon) return;

    this.mensajeError.set(null);

    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);

      if (!respuesta.ok) {
        throw new Error('No se encontró el Pokémon');
      }

      const datos = await respuesta.json();

      this.pokemon.set({
        name: datos.name.toUpperCase(),
        image: datos.sprites.front_default,
        type: datos.types.map((typeInfo: any) => typeInfo.type.name).join(', '),
      });
    } catch (error: any) {
      this.pokemon.set(null);
      this.mensajeError.set(error.message);
    }
     
  }
}

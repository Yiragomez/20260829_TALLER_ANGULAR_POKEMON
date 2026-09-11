import { Component, inject } from '@angular/core';
import { NgStyle} from  '@angular/common';
import { PokemonStorageService } from '../../services/pokemon-storage';
import { ResaltarTarjeta} from '../../directives/resaltar-tarjeta';

@Component({
  selector: 'app-inventario-pokemon',
  imports: [NgStyle, ResaltarTarjeta],
  templateUrl: './inventario-pokemon.html',
  styleUrl: './inventario-pokemon.css'
})
export class InventarioPokemon {
  pokemonService = inject(PokemonStorageService);

}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService, Pokemon } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  query = '';
  pokemon: Pokemon | null = null;
  loading = false;
  error = '';
  searched = false;

  constructor(private pokemonService: PokemonService) {}

  search(): void {
    const term = this.query.trim();
    if (!term) {
      this.error = 'Escribe el nombre o numero de un Pokemon.';
      this.pokemon = null;
      this.searched = true;
      return;
    }

    this.loading = true;
    this.error = '';
    this.searched = true;

    this.pokemonService.search(term).subscribe({
      next: (result) => {
        this.pokemon = result;
        this.loading = false;
      },
      error: () => {
        this.pokemon = null;
        this.error = `No se encontro ningun Pokemon con "${term}".`;
        this.loading = false;
      },
    });
  }

  padId(id: number): string {
    return '#' + id.toString().padStart(3, '0');
  }
}

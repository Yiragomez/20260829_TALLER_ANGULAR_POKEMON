import { Routes } from '@angular/router';
import { RegistroUsuario } from './components/registro-usuario/registro-usuario';
import { BuscadorPokemon } from './components/buscador-pokemon/buscador-pokemon';
import { InventarioPokemon } from './components/inventario-pokemon/inventario-pokemon';
import { Evaluacion3275760 } from './components/evaluacion/evaluacion.3275760';
import { PruebaPrueba } from './components/prueba/prueba.prueba';
import { Formulario } from './formulario/formulario';

export const routes: Routes = [
    { path: 'registro', component: RegistroUsuario },
    { path: 'buscador', component: BuscadorPokemon },
    { path: 'inventario', component: InventarioPokemon },
    { path: 'formulario', component: Formulario },
    { path: 'evaluacion', component: Evaluacion3275760 },
    { path: 'prueba', component: PruebaPrueba },
    { path: '', redirectTo: '/buscador', pathMatch: 'full' },
    { path: '**', redirectTo: '/buscador' },
];

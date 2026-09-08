import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface Usuario {
  id: number;
  nombreCompleto: string;
  LugarNacimiento: {
    pais: string;
    ciudad: string;
  };
  documento: {
    tipo: string;
    numero: string;
  };
  fecha: string;
  numero: string;
  datospersonales: boolean;
  fechaRegistro: string;
} 


@Component({
  imports: [FormsModule],
  selector: 'app-registro-usuario',
  standalone: true,
  styleUrl: './registro-usuario.css',
  templateUrl: './registro-usuario.html',
  
})
export class RegistroUsuario {
  nombre = signal('');
  apellido = signal('');
  pais = signal('');
  ciudad = signal('');
  tipo_documento = signal('CC');
  numero_de_identificacion = signal('');
  fecha_de_nacimiento = signal('');
  numero_de_celular = signal('');
  datos_personales = signal(false);

    ultimoUsuario = signal<Usuario | null>(null);

      guardarUsuario() {
        if(!this.datos_personales()) {
          alert('Debe aceptar la política de datos personales');
        }

        const usuarioCreado: Usuario = {
          id: Date.now(),
          nombreCompleto: `${this.nombre()} ${this.apellido()}`,
          LugarNacimiento: {
            pais: this.pais(),
            ciudad: this.ciudad()
          },
          documento: {
            tipo: this.tipo_documento(),
            numero: this.numero_de_identificacion()
          },
          fecha: this.fecha_de_nacimiento(),
          numero: this.numero_de_celular(),
          datospersonales: this.datos_personales(),
          fechaRegistro: new Date().toLocaleDateString()
        };
    
localStorage.setItem(usuarioCreado.id.toString(), JSON.stringify(usuarioCreado));

this.ultimoUsuario.set(usuarioCreado);
  }
}






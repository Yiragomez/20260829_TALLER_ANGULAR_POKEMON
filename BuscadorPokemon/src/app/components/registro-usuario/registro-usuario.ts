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
  styleUrls: ['./registro-usuario.css'],
  templateUrl: './registro-usuario.html',
})
export class RegistroUsuario {
  nombre = signal('');
  apellido = signal('');
  pais = signal('');
  ciudad = signal('');
  tipo_documento = signal('CC');
  numero_identificacion = signal('');
  fecha_nacimiento = signal('');
  celular = signal('');
  politica_datos = signal(false);

  ultimoUsuario = signal<Usuario | null>(null);

  guardarUsuario() {
    if (!this.politica_datos()) {
      alert('Debe aceptar la política de datos personales');
      return;
    }

    const usuarioCreado: Usuario = {
      id: Date.now(),
      nombreCompleto: `${this.nombre()} ${this.apellido()}`,
      LugarNacimiento: {
        pais: this.pais(),
        ciudad: this.ciudad(),
      },
      documento: {
        tipo: this.tipo_documento(),
        numero: this.numero_identificacion(),
      },
      fecha: this.fecha_nacimiento(),
      numero: this.celular(),
      datospersonales: this.politica_datos(),
      fechaRegistro: new Date().toLocaleDateString(),
    };

    localStorage.setItem(usuarioCreado.id.toString(), JSON.stringify(usuarioCreado));
    this.ultimoUsuario.set(usuarioCreado);
  }
}



import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CrearPersonaController extends Controller {
  @service persona;  // Inyectamos el servicio para gestionar las personas
  @service router;   // Inyectamos el servicio router para las transiciones

  nombre = '';
  apellido = '';
  email = '';

  // Acción para actualizar el nombre
  @action
  actualizarNombre(event) {
    this.nombre = event.target.value;
  }

  // Acción para actualizar el apellido
  @action
  actualizarApellido(event) {
    this.apellido = event.target.value;
  }

  // Acción para actualizar el email
  @action
  actualizarEmail(event) {
    this.email = event.target.value;
  }

  // Acción para manejar el envío del formulario
  @action
  async agregarPersona(event) {
    event.preventDefault();

    // Verificar que los valores de los campos sean correctos
    console.log('Nombre:', this.nombre);
    console.log('Apellido:', this.apellido);
    console.log('Email:', this.email);

    // Validación básica para asegurarse de que los campos no estén vacíos
    if (!this.nombre.trim() || !this.apellido.trim() || !this.email.trim()) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const nuevaPersona = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
    };

    try {
      // Llamamos al servicio para crear la persona
      await this.persona.crearPersona(nuevaPersona);

      // Limpiar los campos del formulario
      this.nombre = '';
      this.apellido = '';
      this.email = '';

      // Redirigir a la lista de personas después de crear la nueva persona
      this.router.transitionTo('personas');  // Usamos el servicio router para redirigir
    } catch (error) {
      console.error('Error al crear persona:', error);
      alert('Hubo un error al crear la persona');
    }
  }
}

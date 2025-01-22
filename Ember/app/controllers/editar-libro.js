// app/controllers/editar-libro.js
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class EditarLibroController extends Controller {

  // El modelo cargado por la ruta se puede acceder directamente desde `this.model`
  
  @action
  set(property, value) {
    this.model[property] = value;  // Actualiza la propiedad del libro en el modelo
  }

  @action
  async actualizarLibro(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    try {
      await this.model.save(); // Guardar los cambios en el modelo (el libro)
      console.log('Libro actualizado:', this.model);
      // Después de actualizar, redirigir a la lista de libros
      this.transitionToRoute('libros');
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
    }
  }
}

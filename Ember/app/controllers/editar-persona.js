import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class EditarPersonaController extends Controller {
  // Los datos de la persona se llenan automáticamente al cargar el modelo
  nombre = '';
  apellido = '';
  email = '';

  @action
  async actualizarPersona() {
    const personaActualizada = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
    };
    
    try {
      const persona = this.model;  // El modelo es la persona cargada por la ruta
      await persona.save();  // Guarda los cambios en el modelo

      this.transitionToRoute('personas');  // Redirigir a la lista de personas
    } catch (error) {
      console.error('Error al actualizar la persona:', error);
    }
  }
}

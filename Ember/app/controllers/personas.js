import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class PersonasController extends Controller {
  @service persona;
  @service router;

  // Acción para obtener todas las personas
  @action
  async obtenerTodasLasPersonas() {
    try {
      const personas = await this.persona.obtenerPersonas();
      this.set('model', personas);
    } catch (error) {
      console.error('Error al obtener las personas:', error);
      this.set('model', []);
    }
  }

  // Acción para agregar una nueva persona
  @action
  async agregarPersona(personaData) {
    try {
      await this.persona.crearPersona(personaData);
      this.obtenerTodasLasPersonas();
      this.router.transitionTo('personas');
    } catch (error) {
      console.error('Error al agregar persona:', error);
      alert('Hubo un error al agregar la persona');
    }
  }

  // Acción para eliminar una persona
  @action
  async eliminarPersona(id_persona) {
    if (confirm('¿Estás seguro de eliminar esta persona?')) {
      try {
        await this.persona.eliminarPersona(id_persona);
        this.obtenerTodasLasPersonas();
      } catch (error) {
        console.error('Error al eliminar persona:', error);
        alert('Error al eliminar la persona');
      }
    }
  }

  // Acción para obtener los datos de una persona para editar
  @action
  async obtenerPersonaParaEditar(id_persona) {
    try {
      const persona = await this.persona.obtenerPersonaPorId(id_persona);
      this.set('personaEdicion', persona);
    } catch (error) {
      console.error('Error al obtener la persona:', error);
    }
  }

  // Acción para editar una persona
  @action
  async editarPersona(id_persona, personaData) {
    try {
      await this.persona.actualizarPersona(id_persona, personaData);
      this.router.transitionTo('personas');
    } catch (error) {
      console.error('Error al editar la persona:', error);
      this.set('errorMessage', 'Hubo un error al editar la persona.');
    }
  }

  // Acción para mostrar el formulario de creación de una persona
  @action
  mostrarFormularioCrear() {
    this.router.transitionTo('crear-persona');
  }

  // Acción para redirigir a la vista de editar persona
  @action
  transitionToEdit(id_persona) {
    // Asegúrate de que el id se pase correctamente a la ruta de edición
    this.router.transitionTo('editar-persona', id_persona);
  }

  // Acciones para actualizar los campos individualmente en el formulario de edición
  @action
  updateNombre(event) {
    this.set('personaEdicion.nombre', event.target.value);  // Cambiar solo el valor del campo nombre
  }

  @action
  updateApellido(event) {
    this.set('personaEdicion.apellido', event.target.value);  // Cambiar solo el valor del campo apellido
  }

  @action
  updateEmail(event) {
    this.set('personaEdicion.email', event.target.value);  // Cambiar solo el valor del campo email
  }
}

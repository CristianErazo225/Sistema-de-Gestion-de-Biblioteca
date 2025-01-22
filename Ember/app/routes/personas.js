// app/routes/personas.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PersonasRoute extends Route {
  @service persona; // Inyectamos el servicio para obtener las personas

  async model() {
    try {
      const personas = await this.persona.obtenerPersonas(); // Llamada al servicio
      return personas; // Devuelve las personas a la plantilla
    } catch (error) {
      console.error('Error al cargar las personas:', error.message || error);
      // Podrías agregar un mensaje o notificación aquí para el usuario
      return []; // Retorna un array vacío en caso de error
    }
  }
}

// app/routes/libros.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LibrosRoute extends Route {
  @service libro; // Inyectamos el servicio

  async model() {
    // Cargamos la lista de libros desde el servicio
    return await this.libro.obtenerLibros();
  }
}

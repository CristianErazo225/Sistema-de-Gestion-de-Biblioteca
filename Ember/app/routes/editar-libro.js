// app/routes/editar-libro.js
import Route from '@ember/routing/route';

export default class EditarLibroRoute extends Route {
  model(params) {
    // Usamos el id_libro que viene en la URL para cargar el libro
    return this.store.findRecord('libro', params.id_libro);
  }
}

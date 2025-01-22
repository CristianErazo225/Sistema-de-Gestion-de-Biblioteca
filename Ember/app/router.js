import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('libros');
  this.route('crear-persona');
  this.route('crear-libro'); // Ruta para agregar libros
  this.route('personas'); // Ruta para listar personas
  this.route('editar-persona', { path: '/editar-persona/:id' });

  // Ruta para editar un libro, utilizando :id_libro
  this.route('editar-libro', { path: '/editar-libro/:id_libro' });

  this.route('prestamos');
});

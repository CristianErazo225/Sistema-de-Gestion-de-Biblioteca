// app/controllers/libros.js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LibrosController extends Controller {
  @service libro;
  @service router;

  libroEdicion = null;  // Inicialización de libroEdicion

  // Acción para obtener todos los libros
  @action
  async obtenerTodosLosLibros() {
    try {
      const libros = await this.libro.obtenerLibros();
      this.set('model', libros);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      this.set('model', []);
    }
  }

  // Acción para agregar un nuevo libro
  @action
  async agregarLibro(libroData) {
    try {
      await this.libro.agregarLibro(libroData);
      this.obtenerTodosLosLibros();
      this.router.transitionTo('libros');
    } catch (error) {
      console.error('Error al agregar libro:', error);
      this.set('errorMessage', 'Hubo un error al agregar el libro'); // Mostrar mensaje en la interfaz
    }
  }

  // Acción para eliminar un libro
  @action
  async eliminarLibro(id_libro) {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      try {
        await this.libro.eliminarLibro(id_libro);
        this.obtenerTodosLosLibros();
      } catch (error) {
        console.error('Error al eliminar libro:', error);
        this.set('errorMessage', 'Error al eliminar el libro');
      }
    }
  }

  // Acción para obtener los datos de un libro para editar
  @action
  async obtenerLibroParaEditar(id_libro) {
    try {
      const libro = await this.libro.obtenerLibro(id_libro); // Verifica si este método es correcto
      this.set('libroEdicion', libro); // Guarda los datos del libro para la edición
    } catch (error) {
      console.error('Error al obtener el libro:', error);
    }
  }

  // Acción para editar un libro
  @action
  async actualizarLibro() {
    // Verifica si el modelo libroEdicion está cargado correctamente
    const libroEdicion = this.libroEdicion;

    const libroActualizado = {
      titulo: libroEdicion.titulo,
      autor: libroEdicion.autor,
      anio_publicacion: libroEdicion.anio_publicacion,
    };

    try {
      await this.libro.actualizarLibro(libroEdicion.id, libroActualizado);  // Usando el servicio para actualizar
      this.router.transitionTo('libros'); // Redirigir a la lista de libros
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
      this.set('errorMessage', 'Hubo un error al actualizar el libro');
    }
  }

  @action
  transitionToEdit(id_libro) {
    console.log('Navegando a la ruta editar-libro con id:', id_libro);
    this.router.transitionTo('editar-libro', id_libro);
  }

  // Acción para mostrar el formulario de creación de un libro
  @action
  mostrarFormularioCrear() {
    this.router.transitionTo('crear-libro');
  }

  // Acciones para actualizar los campos individualmente en el formulario de edición
  @action
  updateTitulo(event) {
    this.set('libroEdicion.titulo', event.target.value);  // Actualiza solo el campo título
  }

  @action
  updateAutor(event) {
    this.set('libroEdicion.autor', event.target.value);  // Actualiza solo el campo autor
  }

  @action
  updateAnioPublicacion(event) {
    this.set('libroEdicion.anio_publicacion', event.target.value);  // Actualiza solo el campo año de publicación
  }
}

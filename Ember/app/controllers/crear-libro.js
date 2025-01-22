import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CrearLibroController extends Controller {
  @service libro; // Inyectamos el servicio para gestionar los libros
  @service router; // Inyectamos el servicio router para las transiciones

  // Variables para capturar los datos del formulario
  titulo = '';
  autor = '';
  anio_publicacion = '';

  // Acción para actualizar el título
  @action
  actualizarTitulo(event) {
    this.titulo = event.target.value;
  }

  // Acción para actualizar el autor
  @action
  actualizarAutor(event) {
    this.autor = event.target.value;
  }

  // Acción para actualizar el año de publicación
  @action
  actualizarAnioPublicacion(event) {
    this.anio_publicacion = event.target.value;
  }

  // Acción para manejar el envío del formulario
  @action
  async agregarNuevoLibro(event) {
    event.preventDefault();  // Evita que la página se recargue al enviar el formulario

    // Verificar que los valores de los campos sean correctos
    console.log('Título:', this.titulo);
    console.log('Autor:', this.autor);
    console.log('Año de Publicación:', this.anio_publicacion);

    // Validación básica para asegurarse de que los campos no estén vacíos
    if (!this.titulo.trim() || !this.autor.trim() || !this.anio_publicacion.trim()) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const nuevoLibro = {
      titulo: this.titulo,
      autor: this.autor,
      anio_publicacion: this.anio_publicacion,
    };

    try {
      // Llamamos al servicio para crear el libro
      await this.libro.agregarLibro(nuevoLibro);

      // Limpiar los campos del formulario
      this.titulo = '';
      this.autor = '';
      this.anio_publicacion = '';

      // Redirigir a la lista de libros después de crear el nuevo libro
      this.router.transitionTo('libros');  // Usamos el servicio router para redirigir
    } catch (error) {
      console.error('Error al agregar el libro:', error);
      alert('Hubo un error al agregar el libro');
    }
  }
}

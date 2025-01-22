import Model, { attr } from '@ember-data/model';

export default class LibroModel extends Model {
  @attr('string') titulo;
  @attr('string') autor;
  @attr('number') anio_publicacion;
}

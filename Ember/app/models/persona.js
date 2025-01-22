import Model, { attr } from '@ember-data/model';

export default class PersonaModel extends Model {
  @attr nombre;
  @attr apellido;
  @attr email;
}

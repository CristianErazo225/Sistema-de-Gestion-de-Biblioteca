import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  // Configura el host o cualquier otra opción si es necesario
  host = 'http://localhost:3000'; // Cambia esta URL según sea necesario
}

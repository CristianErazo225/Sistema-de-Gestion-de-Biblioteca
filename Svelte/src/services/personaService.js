const API_URL = 'http://localhost:3000'; // Cambia la URL según tu backend

export const getPersonas = async () => {
  const response = await fetch(`${API_URL}/persona/obtener/persona`);
  return response.json();
};

export const getPersonaById = async (id) => {
  const response = await fetch(`${API_URL}/persona/${id}`);
  return response.json();
};

export const createPersona = async (persona) => {
  const response = await fetch(`${API_URL}/persona/crear/persona`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(persona),
  });
  return response.json();
};

export const updatePersona = async (id, persona) => {
  const response = await fetch(`${API_URL}/persona/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(persona),
  });
  return response.json();
};

export const deletePersona = async (id) => {
  await fetch(`${API_URL}/persona/${id}`, { method: 'DELETE' });
};

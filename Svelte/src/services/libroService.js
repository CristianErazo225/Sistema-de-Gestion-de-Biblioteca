// src/services/libroService.js
const API_URL = 'http://localhost:3000'; // Cambia la URL según tu backend

export const getLibros = async () => {
  const response = await fetch(`${API_URL}/libro/obtener/libro`);
  return response.json();
};

export const getLibroById = async (id) => {
  const response = await fetch(`${API_URL}/libro/${id}`);
  return response.json();
};

export const createLibro = async (libro) => {
  const response = await fetch(`${API_URL}/libro/crear/libro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(libro),
  });
  return response.json();
};

export const updateLibro = async (id, libro) => {
  const response = await fetch(`${API_URL}/libro/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(libro),
  });
  return response.json();
};

export const deleteLibro = async (id) => {
  await fetch(`${API_URL}/libro/${id}`, { method: 'DELETE' });
};

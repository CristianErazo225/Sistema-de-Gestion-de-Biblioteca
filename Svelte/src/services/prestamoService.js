const API_URL = 'http://localhost:3000'; // Cambia la URL según tu backend

export const getPrestamos = async () => {
  const response = await fetch(`${API_URL}/prestamo/full/prestamos`);
  return response.json();
};

export const getPrestamoById = async (id) => {
  const response = await fetch(`${API_URL}/prestamo/${id}`);
  return response.json();
};

export const createPrestamo = async (prestamo) => {
  const response = await fetch(`${API_URL}/prestamo/crear/prestamo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prestamo),
  });
  return response.json();
};

export const updatePrestamo = async (id, prestamo) => {
  const response = await fetch(`${API_URL}/prestamo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prestamo),
  });
  return response.json();
};

export const deletePrestamo = async (id) => {
  await fetch(`${API_URL}/prestamo/${id}`, { method: 'DELETE' });
};

// export const fullPrestamos = async () => {
//     const response = await fetch(`${API_URL}/prestamo/full/prestamos`);
//     return response.json();
// };

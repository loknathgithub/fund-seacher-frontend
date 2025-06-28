const API_BASE =process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

// Register
export async function register(username, password) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

// Login
export async function login(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

// Save a fund
export async function saveFund(fundId) {
  const token = getToken();
  console.log("Token used for saveFund:", token);

  const res = await fetch(`${API_BASE}/save-fund`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ fundId }),
  });
  return res.json();
}

// Get saved funds
export async function getSavedFunds() {
  const token = getToken();
  console.log('API_BASE:', API_BASE);
  console.log('Fetching:', `${API_BASE}/saved-funds`);

  const res = await fetch(`${API_BASE}/saved-funds`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return res.json();
}

// Remove a saved fund
export async function removeFund(fundId) {
  const token = getToken();
  const res = await fetch(`${API_BASE}/saved-funds/${fundId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return res.json();
}


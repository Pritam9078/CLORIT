const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * Enhanced API client for CLORIT
 */
export const api = {
  getToken: () => localStorage.getItem('clorit_admin_token'),
  setToken: (token: string) => localStorage.setItem('clorit_admin_token', token),
  clearToken: () => localStorage.removeItem('clorit_admin_token'),

  getHeaders: () => {
    const token = api.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  get: async (endpoint: string, options: RequestInit = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...api.getHeaders(),
        ...options.headers,
      },
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message || 'API Error');
    }
    return res.json();
  },

  post: async (endpoint: string, body: any, options: RequestInit = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
      headers: {
        ...api.getHeaders(),
        ...options.headers,
      },
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message || 'API Error');
    }
    return res.json();
  },

  /**
   * Authorized requests (Legacy support for raw signature headers if needed)
   */
  auth: {
    get: (endpoint: string, address: string, signature: string) => {
      return api.get(endpoint, {
        headers: {
          'x-wallet-address': address,
          'x-signature': signature
        }
      });
    },
    post: (endpoint: string, body: any, address: string, signature: string) => {
        return api.post(endpoint, body, {
          headers: {
            'x-wallet-address': address,
            'x-signature': signature
          }
        });
      }
  }
};

import { useAuthStore } from '../store/useAuthStore';

export const API_BASE_URL = "http://localhost:3000";

type ApiFetchOptions = RequestInit & { params?: Record<string, unknown> };

export async function apiFetch<T>(
  path: string,
  options?: ApiFetchOptions,
): Promise<T> {
  const { params, headers, ...requestOptions } = options ?? {};
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    }
  }

  const token = useAuthStore.getState().token;
  const isGetRequest = !requestOptions.method || requestOptions.method.toUpperCase() === "GET";

  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    // Não envia Token em buscas GET para não estourar o CORS no servidor simulado
    ...(token && !isGetRequest ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const response = await fetch(url.toString(), {
    ...requestOptions,
    headers: requestHeaders,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:8080/api"
).replace(/\/$/, "");

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}/${path.replace(/^\//, "")}`;

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `Erro na API: HTTP ${response.status} ${response.statusText}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

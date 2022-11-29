export async function fetchHandler<T>(
  url: RequestInfo | URL,
  config?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...config,
    body: config?.body ? JSON.stringify(config.body) : null
  });

  if (response.status >= 200 && response.status < 300) {
    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  }

  throw new Error(`Error ${response.status} - ${response.statusText}`);
}

async function request<TResponse>(
  url: string,
  config?: any
): Promise<TResponse> {
  const response = await fetchHandler<TResponse>(url, config);
  return response;
}

export const api = {
  post: <TBody, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, { method: 'POST', body }),
  get: <TResponse>(url: string) => request<TResponse>(url),
  put: <TBody, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, { method: 'PUT', body }),
  delete: <TResponse>(url: string) =>
    request<TResponse>(url, { method: 'DELETE' })
};

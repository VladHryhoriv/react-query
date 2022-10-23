export async function api<T>(
  url: RequestInfo | URL,
  config?: RequestInit
): Promise<T> {
  const response = await fetch(url, config);

  if (response.status === 200) {
    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  }

  throw new Error(`Error ${response.status} - ${response.statusText}`);
}

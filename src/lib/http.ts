import { API_URL } from '@app/constants';

export async function postJson<T>(
  path: string,
  body: unknown
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // fine even if you don’t use cookies yet
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw Object.assign(new Error(data?.message || 'Request failed'), { data });
  return data;
}

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw Object.assign(new Error(data?.message || 'Request failed'), { data });
  return data;
}
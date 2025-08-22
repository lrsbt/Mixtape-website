import { useState } from 'react';
import { postJson, getJson } from '@app/lib/http';

type LoginOk = { ok: true; user: { id: number; email: string } };
type MeOk    = { ok: true; user: { id: number; email: string }, token: string | null };
type ApiErr  = { ok: false; code: string; message: string };

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); setLoading(true);
    try {
      // 1) login (sets session cookie)
      await postJson<LoginOk>('/login', { email, password });

      // 2) fetch /me to get API token
      const me = await getJson<MeOk>('/me');
      setMsg(`✅ Hello ${me.user.email}${me.token ? ` — API token: ${me.token}` : ''}`);
    } catch (err: any) {
      const api: ApiErr | undefined = err?.data;
      setMsg(`❌ ${api?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            placeholder="email" value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <input type="password" placeholder="password" value={password}
                 onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button style={{ marginTop: 12 }} disabled={loading}>
          {loading ? 'Signing in…' : 'Login'}
        </button>
      </form>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}
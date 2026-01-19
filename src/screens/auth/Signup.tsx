import { useState } from 'react';
import { postJson } from '@app/lib/http';

type SignupOk = { ok: true; user: { id: number; email: string }; token: string };
type ApiErr = { ok: false; code: string; message: string };

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await postJson<SignupOk>('/signup', { email, password });
      // Message
      // setMsg(`✅ Signed up as ${res.user.email}. Your API token: ${res.token}`);
      // Redirect
      if (res.ok) { window.location.href = '/me'; } else { console.error(res); }
    } catch (err: any) {
      const api: ApiErr | undefined = err?.data;
      setMsg(`❌ ${api?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={{ marginTop: 12 }} disabled={loading}>
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}
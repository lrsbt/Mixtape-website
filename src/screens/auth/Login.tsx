import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { postJson } from '@app/lib/http';

type LoginOk = { ok: true; user: { id: number; email: string } };
type ApiErr  = { ok: false; code: string; message: string };

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      await postJson<LoginOk>('/login', { email, password });
      navigate("/me");
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
import { useEffect, useState } from 'react';
import { postJson } from '@app/lib/http';

type LogoutOk = { ok: true };

const Logout = () => {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    handleLogout()
  }, [])

  const handleLogout = async () => {
    const result = await postJson<LogoutOk>('/logout', {});
    setSuccess(result.ok);
    setTimeout(() => window.location.href = "/login", 1000);
  }

  return (
    <div>
      {success && <div>You are now logged out</div>}
    </div>
  );
}

export default Logout;
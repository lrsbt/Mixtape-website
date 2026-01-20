import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "@app/hooks/query";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const signUpMutation = useSignupMutation();

  const handleSignup = async () => {
    try {
      await signUpMutation.mutateAsync({ email, password });
      navigate("/me");
    } catch (err) {
      console.log("error", err?.message);
      setMsg("There's a problem with the signup");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Sign up</h1>
      <div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button style={{ marginTop: 12 }} onClick={handleSignup}>
        Create account
      </button>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
};

export { Signup };

import { useEffect, useState } from "react";
import { getJson } from "@app/lib/http";

type MeResponse = {
  ok: boolean;
  user?: {
    id: number;
    email: string;
    token: string | null;
  };
  code?: string;
  message?: string;
};

const MyProfile = () => {
  const [me, setMe] = useState<MeResponse | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await getJson<MeResponse>("/me");
      setMe(res);
    };
    fetchMe();
  }, []);

  if (!me) return <div>Loading...</div>;
  if (!me.ok) return <div>Not logged in ({me.message})</div>;

  return (
    <div style={{ padding: 16 }}>
      <h1>Profile</h1>
      <p>Email: {me.user?.email}</p>
      <p>API key: {me.user?.token}</p>
    </div>
  );
};

export default MyProfile;
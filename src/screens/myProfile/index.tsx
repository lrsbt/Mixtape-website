import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getJson } from "@app/lib/http";
import { API_URL } from "@app/constants";

type MeResponse = {
  ok: boolean;
  user?: {
    id: number;
    email: string;
  };
  token: string | null;
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

  console.log(me);

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {me.user?.email}</p>
      <p>API token: {me.token}</p>
      <audio controls src={`${API_URL}/myMix?ts=${Date.now()}`} />
      <div>
        <Link to="/logout">Log out</Link>
      </div>
    </div>
  );
};

export default MyProfile;
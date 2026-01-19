import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getJson } from "@app/lib/http";
import { API_URL } from "@app/constants";

type Me = {
  ok: boolean;
  user?: {
    id: number;
    email: string;
  };
  token: string | null;
  code?: string;
  message?: string;
};

type Lists = { [key: string]: any; }

const MyProfile = () => {
  const [me, setMe] = useState<Me | null>(null);
  const [lists, setLists] = useState<Lists | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await getJson<Me>("/me");
      setMe(res);
    };
    fetchMe();
    //
    const fetchLists = async () => {
      const res = await getJson<Lists>("/lists");
      const lists = Object.keys(res).map(i => res[i]?.name)
      setLists(lists);
    };
    fetchLists();
  }, []);

  if (!me) return <div>Loading...</div>;
  if (!me.ok) return <div>Not logged in ({me.message})</div>;



  console.log(me);

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {me.user?.email}</p>
      <p>Lists: {lists?.join(', ')} </p>
      <p>API token: {me.token}</p>
      <audio controls src={`${API_URL}/myMix?ts=${Date.now()}`} />
      <div>
        <Link to="/logout">Log out</Link>
      </div>
    </div>
  );
};

export default MyProfile;
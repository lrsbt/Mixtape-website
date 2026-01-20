import { Link } from "react-router-dom";
import { useAuth, useLists } from "@app/hooks/query";
import { API_URL } from "@app/constants";

const MyProfile = () => {
  const { user, token, isLoading } = useAuth();
  const { lists } = useLists();

  if (isLoading) return <p>Loading</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user?.email}</p>
      <p>API token: {token}</p>
      <p>Lists: {lists?.map((l) => l.name)?.join(", ")}</p>
      <audio controls src={`${API_URL}/myMix?ts=${Date.now()}`} />
      <div>
        <Link to="/logout">Log out</Link>
      </div>
    </div>
  );
};

export { MyProfile };

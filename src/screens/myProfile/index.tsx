import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "@app/constants";
import { useAuth, useLists } from "@app/hooks/query";


const MyProfile = () => {
  const { user, token, isLoading } = useAuth();
  const { lists } = useLists();
  const [selectedListId, setSelectedListId] = useState<number | null>(1);

  if (isLoading) return <p>Loading</p>;

  const Lists = () => {
    if (!lists) return;

    return lists.map(list => {
      return <a
        href="#"
        className={classNames("list", { 'list--selected' : selectedListId === list.id })}
        onClick={() => setSelectedListId(list.id)}>
          {list.name}
        </a>
    })
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user?.email}</p>
      <p>API token: {token}</p>
      <p>Lists: <Lists /></p>
      <audio controls src={`${API_URL}/myMix?ts=${Date.now()}&listId=${selectedListId}`} />
      <div>
        <Link to="/logout">Log out</Link>
      </div>
    </div>
  );
};

export { MyProfile };

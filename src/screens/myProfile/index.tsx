import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "@app/constants";
import { useAuth, useLists, useMixStatus } from "@app/hooks/query";
import type { ListItem, Me } from "../../types/api";

const MyProfile = () => {
  const { user, token, isLoading: isLoadingUser } = useAuth();
  const { lists } = useLists();
  const initialList = lists?.[0]?.id;

  if (!user || !token) return null;
  if (!lists || !initialList) return null;
  if (isLoadingUser) return <p>Loading</p>;

  return <Content
    user={user}
    token={token}
    lists={lists}
    initialList={initialList}
  />

};

interface ContentProps {
  lists: ListItem[],
  initialList: number,
  user: Me['user'],
  token: Me['token']
}

const Content = ({ lists, initialList, user, token }: ContentProps) => {
  const [selectedList, setSelectedList] = useState<number>(initialList);
  const { mixStatus, isLoading } = useMixStatus(selectedList);

  const Lists = () => (
      lists.map(list => (
        <a
          href="#"
          className={classNames("list", { 'list--selected' : selectedList === list.id })}
          onClick={() => setSelectedList(list.id)}>
            {list.name}
          </a>
      ))
  )

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user?.email}</p>
      <p>API token: {token}</p>
      <p>Lists: <Lists /></p>
      {isLoading && <div>Loading</div>}
      {mixStatus?.state === "mixing" && <div>Mix in progress</div>}
      {mixStatus?.state === "empty" && <div>No Recordings yet</div>}
      {mixStatus?.state === "ready" && (
      <audio controls key={mixStatus.entriesHash}>
        <source src={`${API_URL}/myMix?listId=${selectedList}`} type="audio/mpeg" />
      </audio>
      )}
      <div>
        <Link to="/logout">Log out</Link>
      </div>
    </div>
  );
}

export { MyProfile };

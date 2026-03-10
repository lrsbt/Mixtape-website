import classNames from "classnames";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "@app/constants";
import { useAuth, useLists, useMixStatus } from "@app/hooks/query";
import type { ListItem, Me, StatusEntry } from "@app/types/api";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedList, setSelectedList] = useState<number>(initialList);
  const { mixStatus, isLoading } = useMixStatus(selectedList);
  const [currentBlock, setCurrentBlock] = useState(0);

  const navigateTo = (sec: number) => {
    if (audioRef.current) audioRef.current.currentTime = sec;
  }

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    if (mixStatus?.state != "ready") return;

    const times = mixStatus.times;
    const currentTime = audioRef.current.currentTime;

    // SetCurrentBlock Logic
    for (let i = 0; i < times.length; i++) {
      const startTime = times[i];
      const endTime = times[i + 1] ?? Infinity;

      if (currentTime >= startTime && currentTime < endTime) {
        setCurrentBlock((prev) => (prev === i ? prev : i));  // only update when something changes
        break;
      }
    }
  }

  const Lists = () => (
    lists.map(list => (
      <a
        href="#"
        className={classNames("list", { 'list--selected': selectedList === list.id })}
        onClick={() => setSelectedList(list.id)}>
        {list.name}
      </a>
    ))
  )

  const Blocks = ({ items }: { items: StatusEntry[] }) => {
    return <div className="blocks">
      {items.map((b, i) => {
        const isCurrent = currentBlock === i;
        const className = classNames("blocks-item", { "blocks-item--selected": isCurrent });
        return <div
          className={className}
          onClick={() => navigateTo(b.startAt)}
        />
      })}
    </div>
  }

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
        <>
          <Blocks items={mixStatus.entries} />
          <audio
            ref={audioRef}
            key={mixStatus.entriesHash}
            src={`${API_URL}/myMix?listId=${selectedList}`}
            controls
            onTimeUpdate={onTimeUpdate}
          />
        </>
      )}
      <div>
        <Link to="/logout">Log out</Link>
      </div>
    </div>
  );
}

export { MyProfile };

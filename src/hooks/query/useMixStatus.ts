import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { cacheKeys } from "@app/constants/cacheKeys";

import { API_URL } from "@app/constants";

type MixStatus =
  | { ok: true; state: "ready", entriesHash: string }
  | { ok: false; state: "mixing" | "empty" };

export const useMixStatus = (listId: number) => {
  const query = useQuery({
    queryKey: cacheKeys.mixStatus(listId),
    enabled: !!listId,
    queryFn: () =>
      axios
        .get<MixStatus>(`${API_URL}/myMixStatus`, { params: { listId }, withCredentials: true })
        .then((res) => res.data),
    staleTime: 0,
    refetchInterval: (q) => (q.state.data?.state === "mixing" ? 1000 : false),
  });

  return {
    mixStatus: query.data,
    ...query
  }
};

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { cacheKeys } from "@app/constants/cacheKeys";

import { API_URL } from "@app/constants";
import type { MixStatus } from "@app/types/api";

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

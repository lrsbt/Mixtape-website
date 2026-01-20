import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { cacheKeys } from "@app/constants/cacheKeys";

import { API_URL } from "@app/constants";
import type { Lists } from "@app/types/api";

export const useLists = () => {
  const { data, isLoading, error, refetch } = useQuery<Lists, AxiosError>({
    queryKey: cacheKeys.lists,
    queryFn: () =>
      axios
        .get(`${API_URL}/lists`, { withCredentials: true })
        .then((res) => res.data)
  });

  return {
    lists: data,
    isLoading,
    error,
    refetch,
  };
};

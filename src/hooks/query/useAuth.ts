import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { cacheKeys } from "@app/constants/cacheKeys";

import { API_URL } from "@app/constants";
import type { Me } from "@app/types/api";

export const useAuth = () => {
  const { data, isLoading, error, refetch } = useQuery<Me, AxiosError>({
    queryKey: cacheKeys.me,
    queryFn: () =>
      axios
        .get(`${API_URL}/me`, { withCredentials: true })
        .then((res) => res.data),
    retry: false, // don't retry on failure (e.g. not logged in)
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  return {
    user: data?.user,
    token: data?.token,
    isLoading,
    error,
    refetch,
  };
};

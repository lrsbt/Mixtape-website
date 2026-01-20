import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@app/constants";
import { queryClient } from "@app/hooks/query";
import type { Me } from "@app/types/api";

interface Params {
  email: string;
  password: string;
}

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (params: Params) => {
      const { data } = await axios.post(`${API_URL}/signup`, params, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return data as Me;
    },
    onSuccess: (data: Me) => {
      // populate the "me" cache immediately
      queryClient.setQueryData(["me"], data);
    },
  });
};

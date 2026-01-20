import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@app/constants";

export const useLogout = () => {
  return useMutation({
    mutationFn: () =>
      axios
        .post(`${API_URL}/logout`, { withCredentials: true })
        .then((res) => res.data),
  });
};

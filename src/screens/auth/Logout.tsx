import { useEffect } from "react";
import { persister, queryClient } from "@app/hooks/query";
import { useLogout } from "@app/hooks/query";

const Logout = () => {
  const { mutate: logout, isSuccess } = useLogout();

  useEffect(() => {
    queryClient.removeQueries();
    persister.removeClient();
    logout();
  }, []);

  return isSuccess && <div>You are now logged out</div>;
};

export { Logout };

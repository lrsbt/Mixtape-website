import { useNavigate } from "react-router-dom";
import { useAuth } from "@app/hooks/query";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate("/login");
  }
  return children;
};

export { ProtectedRoute };

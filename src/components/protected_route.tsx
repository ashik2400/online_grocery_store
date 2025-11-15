import { Navigate } from "react-router-dom"
import { useAuth } from "../context/Auth_Context";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

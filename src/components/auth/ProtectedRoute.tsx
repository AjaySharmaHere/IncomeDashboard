import { Navigate } from "react-router";
import { auth } from "../../firebase/firebase";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = auth.currentUser;

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  // Logged in → render the requested route
  return children;
}

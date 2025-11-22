import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { auth } from "../../firebase/firebase";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// import { Navigate } from "react-router";
// import { auth } from "../../firebase/firebase";
// import { JSX } from "react";

// interface ProtectedRouteProps {
//   children: JSX.Element;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const user = auth.currentUser;

//   if (!user) {
//     // Not logged in → redirect to login
//     return <Navigate to="/" replace />;
//   }

//   // Logged in → render the requested route
//   return children;
// }

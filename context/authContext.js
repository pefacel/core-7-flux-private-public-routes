import { useReducer, useEffect, createContext, useState } from "react";
import { auth } from "../lib/firebase";

const firebaseReducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        });
      } else {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: null,
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = { state, dispatch, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };

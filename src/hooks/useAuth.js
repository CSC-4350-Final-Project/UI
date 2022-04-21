/* eslint-disable consistent-return */
import * as React from 'react';

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
      setAuthed(true);
    }
  }, []);

  return {
    authed,
    login(token) {
      localStorage.setItem('token', token);
      setAuthed(true);
    },
    logout() {
      localStorage.removeItem('token');
      setAuthed(false);
    },
    headers() {
      const token = localStorage.getItem('token');

      if (token && token !== 'null') {
        return { Authorization: `Bearer ${token}` };
      }
    },
  };
}

const authContext = React.createContext();
// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}

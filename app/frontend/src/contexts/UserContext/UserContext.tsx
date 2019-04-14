import * as React from 'react';

import { LOCALSTORAGE_KEYS } from 'src/Shared/constants';

type UserType = null | {
  email: string | null;
  token: string | null;
};

type UserContextType = {
  user: null | UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

let userDefault = null; // { email: null, token: null };

const userFromLocalStorage = localStorage.getItem(LOCALSTORAGE_KEYS.USER);

if (userFromLocalStorage) {
  try {
    userDefault = JSON.parse(userFromLocalStorage);
  } catch (e) {
    localStorage.removeItem(LOCALSTORAGE_KEYS.USER);
    userDefault = null;
  }
}

const userContextDefault = {
  user: userDefault,
  setUser: () => null,
};

const UserContext = React.createContext<UserContextType>(userContextDefault);

export const UserContextProvider: React.FunctionComponent = ({
  children,
}): React.ReactElement => {
  const [user, setUser] = React.useState<UserType>(userDefault);

  React.useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = (): UserContextType =>
  React.useContext(UserContext);

import * as React from 'react';

type UserType = null | {
  email: string | null;
  token: string | null;
};

type UserContextType = {
  user: null | UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

let userDefault = null; // { email: null, token: null };

const userFromLocalStorage = localStorage.getItem('user');

if (userFromLocalStorage) {
  userDefault = JSON.parse(userFromLocalStorage);
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
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = (): UserContextType =>
  React.useContext(UserContext);

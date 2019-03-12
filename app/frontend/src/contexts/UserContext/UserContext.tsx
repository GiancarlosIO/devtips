import * as React from 'react';

type UserType = {
  email: string | null;
  token: string | null;
};

type UserContext = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

let userDefault = { email: null, token: null };

const userFromLocalStorage = localStorage.getItem('user');

if (userFromLocalStorage) {
  userDefault = JSON.parse(userFromLocalStorage);
}

let userContextDefault = {
  user: userDefault,
  setUser: () => null,
};

const UserContext = React.createContext<UserContext>(userContextDefault);

export const UserContextProvider: React.FunctionComponent = ({
  children,
}): React.ReactElement => {
  const [user, setUser] = React.useState<UserType>(userDefault);

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user.email, user.token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = (): UserContext => React.useContext(UserContext);

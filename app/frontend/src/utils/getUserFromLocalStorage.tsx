import { LOCALSTORAGE_KEYS } from 'src/Shared/constants';

const getUserFromLocalStorage = (): { email: string; token: string } | null => {
  const user = localStorage.getItem(LOCALSTORAGE_KEYS.USER);

  if (user) {
    try {
      const userParsed = JSON.parse(user);

      return userParsed;
    } catch (error) {
      console.error('Error to parse the user data', error);
      return null;
    }
  }

  return null;
};

export default getUserFromLocalStorage;

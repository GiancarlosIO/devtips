const getUserFromLocalStorage = (): { email: string; token: string } | null => {
  const user = localStorage.getItem('user');

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

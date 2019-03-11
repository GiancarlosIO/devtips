const getCookie = (name: string): string | null => {
  const cookies = decodeURIComponent(document.cookie);

  if (!cookies.includes(name)) {
    return '';
  }

  const cookie = cookies
    .split(';')
    .find(cookieString => cookieString.includes(name));

  if (!cookie) {
    return '';
  }

  return cookie.split('=')[1];
};

export default getCookie;

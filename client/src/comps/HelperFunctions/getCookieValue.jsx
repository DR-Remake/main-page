const getCookieValue = (cookieName) => {
  const theCookie = cookieName;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  let result = cookieArray.map((cookie) => {
    return cookie
      .trim()
      .split("=")
      .filter((word) => word.includes(theCookie));
  });
  return (result = result.filter((arr) => arr.length > 0));
};

export default getCookieValue;

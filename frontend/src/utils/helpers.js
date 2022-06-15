/*
  handleCookies(cookies: Array<{name, value, options}>, callback: () => any)
*/
export default function handleCookies(cookies, callback) {
  cookies.forEach(cookie => callback(cookie.name, cookie.value, cookie.options || {
    path: "/"
  }));
}
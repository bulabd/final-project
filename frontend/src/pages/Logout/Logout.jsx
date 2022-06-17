import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Logout () {

  const navigate = useNavigate();
  const [, , removeCookie] = useCookies();
  useEffect(() => {
    onLogout();
  }, [])
  
  function onLogout() {
    // Remove cookie
    removeCookie("idCookie");
    removeCookie("emailCookie");
    // Navigate home on logout
    navigate('/', { replace: true });
  }
  return null;
};
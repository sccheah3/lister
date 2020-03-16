import React from "react";
import { Button } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <div style={{marginRight: "40%", marginLeft: "40%", minWidth: "100px"}}>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;
import React from "react";
import SideImage from "../components/auth/SideImage";
import SideForm from "../components/auth/SideForm";
import useAuth from "../hooks/useAuth";

function AuthPage() {
  const { auth } = useAuth();
  console.log(auth);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <SideImage />
      <SideForm />
    </div>
  );
}

export default AuthPage;

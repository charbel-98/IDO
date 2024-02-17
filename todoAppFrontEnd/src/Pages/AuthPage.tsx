import SideImage from "../components/auth/SideImage";
import SideForm from "../components/auth/SideForm";

function AuthPage() {
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <SideImage />
      <SideForm />
    </div>
  );
}

export default AuthPage;

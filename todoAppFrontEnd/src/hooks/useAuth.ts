import { useSelector } from "react-redux";
const useAuth = () => {
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  return { auth: accessToken };
};

export default useAuth;

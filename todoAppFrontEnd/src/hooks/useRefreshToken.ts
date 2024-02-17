import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { setAuth } from "../redux/auth/authSlice";
const useRefreshToken = (controller?: any) => {
  const auth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const refresh = async () => {
    let response;
    try {
      response = await axios.post(
        "/Authentication/RefreshToken",
        {
          Token: auth,
        },
        {
          withCredentials: true,
          signal: controller.signal,
        }
      );
    } catch (error) {
      console.log(error);
    }
    // console.log(JSON.stringify(auth));
    dispatch(
      setAuth({
        accessToken: response?.data?.token,
        user: response?.data?.email,
      })
    );
    //update the token in local storage
    localStorage.setItem("token", response?.data?.token);
    // console.log(response?.data?.accessToken);

    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

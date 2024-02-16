import logo from "../../assets/Logo/Logo.png";
import classes from "./Header.module.css";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import avatar from "../../assets/Bitmap/Bitmap.png";
import { TaskItem } from "../../types";
import { LogoutIcon } from "../../assets/Icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/searchSlice";
import { useNavigate } from "react-router-dom";
interface Props {
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  nbTasks: number;
}

function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showProfile, setShowProfile] = useState<Boolean | null>(null);
  return (
    <div className={`${classes.profileContainer}`}>
      <img
        src={avatar}
        className={`${classes.avatar}`}
        onClick={() => {
          console.log(showProfile);
          if (showProfile === null) return setShowProfile(true);

          if (showProfile || showProfile === false)
            return setShowProfile(!showProfile);
        }}
      />
      <div
        className={`${classes.profileToggle} ${
          showProfile != null
            ? showProfile
              ? classes.showProfile
              : classes.hideProfile
            : classes.displayNone
        } `}
      >
        <div className={`${classes.imgContainer}`}>
          <img className={`${classes.toggledAvatar}`} src={avatar} />
        </div>
        <div className={`${classes.userInfo}`}>
          <p>{user}</p>
          <p
            onClick={() => {
              navigate("/logout");
            }}
          >
            Log Out
            <LogoutIcon styleClasses={`${classes.logoutIcon}`} />
          </p>
        </div>
      </div>
    </div>
  );
}

const Header = ({ setTasks, nbTasks }: Props) => {
  const dispatch = useDispatch();
  return (
    <nav className={` ${classes.nav}`}>
      <img src={logo} alt="logo" className={`${classes.logo}`} />
      <div className={`${classes.navContainer}`}>
        <svg width="0" height="0">
          <linearGradient
            id="blue-gradient"
            x1="100%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop stopColor="#2D2B52" offset="20%" />
            <stop stopColor="#D1A8EC" offset="80%" />
          </linearGradient>
        </svg>
        <div className={`${classes.searchContainer}`}>
          <input
            className={`${classes.search}`}
            placeholder="What are you looking for?"
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
            }}
            onBlur={() => {
              dispatch(setSearch(""));
            }}
          />
          <IoSearchSharp
            className={`${classes.searchIcon}`}
            size={24.33}
            style={{ fill: "url(#blue-gradient)" }}
          ></IoSearchSharp>
        </div>
        <div>
          <MdOutlineAddCircleOutline
            onClick={addNewTask}
            size={24}
            style={{ fill: "url(#blue-gradient)" }}
          />
        </div>
        <Profile></Profile>
      </div>
    </nav>
  );
  function addNewTask() {
    //add new empty task to state
    setTasks((prev) => [
      {
        id: nbTasks + 1 + "",
        columnId: "todo",
        content: {
          title: "",
          category: "",
          dueDate: "",
          estimate: "",
          importance: "",
          progress: "",
        },
      },
      ...prev,
    ]);
  }
};

export default Header;

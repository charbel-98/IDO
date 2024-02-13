import logo from "../../assets/Logo/Logo.png";
import classes from "./Header.module.css";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import avatar from "../../assets/Bitmap/Bitmap.png";
import { TaskItem } from "../../types";
interface Props {
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  nbTasks: number;
}
const Header = ({ setTasks, nbTasks }: Props) => {
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
          <div className={`${classes.searchBox}`}>
            <input
              className={`${classes.search}`}
              placeholder="What are you looking for?"
            />
            <IoSearchSharp
              className={`${classes.searchIcon}`}
              size={24.33}
              style={{ fill: "url(#blue-gradient)" }}
            ></IoSearchSharp>
          </div>
        </div>
        <MdOutlineAddCircleOutline
          onClick={addNewTask}
          size={24}
          style={{ fill: "url(#blue-gradient)" }}
        />
        <div className={`${classes.profileContainer}`}>
          <img src={avatar} className={`${classes.avatar}`} />
          <div className={`${classes.profileToggle}`}></div>
        </div>
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

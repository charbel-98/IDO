import logo from "../../assets/Logo/Logo.png";
import classes from "./Header.module.css";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import avatar from "../../assets/Bitmap/Bitmap.png";
const Header = () => {
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
        <IoSearchSharp size={24.33} style={{ fill: "url(#blue-gradient)" }} />
        <MdOutlineAddCircleOutline
          size={24}
          style={{ fill: "url(#blue-gradient)" }}
        />
        <img src={avatar} className={`${classes.avatar}`} />
      </div>
    </nav>
  );
};

export default Header;

import { ManSVG, WomanSVG } from "../../assets/Icons";
import logo from "../../assets/Logo/Logo@2x.png";
import classes from "./sideImage.module.css";
function SideImage() {
  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.imageContainer}`}>
        <img src={logo} />
      </div>
      <div className={`${classes.bottomContainer}`}>
        <WomanSVG styleClasses={`${classes.woman}`} />
        <ManSVG styleClasses={`${classes.man}`} />
      </div>
    </div>
  );
}

export default SideImage;

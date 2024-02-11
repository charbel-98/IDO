import { FiMenu } from "react-icons/fi";
import classes from "./taskProgress.module.css";
import { FaListCheck } from "react-icons/fa6";
import { TbCheckbox } from "react-icons/tb";
function TaskProgress({ type }: { type: string }) {
  return (
    <div className={`${classes.progressCard}`}>
      {type === "todo" && (
        <>
          <FiMenu size={23} color={"#8E7AD2"} className={`${classes.icon}`} />
          <p className={`${classes.title}`}>To Do</p>
        </>
      )}
      {type === "doing" && (
        <>
          <FaListCheck
            size={23}
            color={"#FE913E"}
            className={`${classes.icon}`}
          />
          <p className={`${classes.title}`}>Doing</p>
        </>
      )}
      {type === "done" && (
        <>
          <TbCheckbox
            size={23}
            color={"#39AC95"}
            className={`${classes.icon}`}
          />
          <p className={`${classes.title}`}>Done</p>
        </>
      )}
    </div>
  );
}

export default TaskProgress;

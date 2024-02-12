import { FiMenu } from "react-icons/fi";
import classes from "./taskProgress.module.css";
import { FaListCheck } from "react-icons/fa6";
import { TbCheckbox } from "react-icons/tb";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
interface Props {
  type: string;
  listeners: SyntheticListenerMap | undefined;
}
function TaskProgress({ type, listeners }: Props) {
  return (
    <>
      {type === "todo" && (
        <>
          <div {...listeners} className={`${classes.progressCard}`}>
            <FiMenu size={23} color={"#8E7AD2"} className={`${classes.icon}`} />
            <p className={`${classes.title}`}>To Do</p>
          </div>
        </>
      )}
      {type === "doing" && (
        <>
          {" "}
          <div {...listeners} className={`${classes.progressCard}`}>
            <FaListCheck
              size={23}
              color={"#FE913E"}
              className={`${classes.icon}`}
            />
            <p className={`${classes.title}`}>Doing</p>
          </div>
        </>
      )}
      {type === "done" && (
        <>
          {" "}
          <div {...listeners} className={`${classes.progressCard}`}>
            <TbCheckbox
              size={23}
              color={"#39AC95"}
              className={`${classes.icon}`}
            />
            <p className={`${classes.title}`}>Done</p>
          </div>
        </>
      )}
    </>
  );
}

export default TaskProgress;

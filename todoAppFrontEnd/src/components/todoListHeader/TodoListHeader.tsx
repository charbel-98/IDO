import { IoClose } from "react-icons/io5";
import classes from "./todoListHeader.module.css";
const TodoListHeader = ({ clickHandler }: { clickHandler: () => void }) => {
  return (
    <div className={`${classes.listHeader}`}>
      <div className={`${classes.content}`}>
        "Anything that can go wrong, will go wrong!"
      </div>
      <div
        style={{
          marginRight: "5%",
        }}
      >
        <IoClose
          onClick={clickHandler}
          className={`${classes.icon}`}
          size={30}
          color={"#ffffff"}
        />
      </div>
    </div>
  );
};

export default TodoListHeader;

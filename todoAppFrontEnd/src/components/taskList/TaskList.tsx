import Task from "../UI/Task";
import TaskProgress from "../UI/TaskProgress";
import classes from "./taskList.module.css";
function TaskList() {
  return (
    <>
      <div className={`${classes.taskList}`}>
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
      <div className={`${classes.taskList}`}>
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
      <div className={`${classes.taskList}`}>
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </>
  );
}

export default TaskList;

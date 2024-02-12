import { useSortable } from "@dnd-kit/sortable";
import classes from "./task.module.css";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "../../../types";
import { useState } from "react";
interface Props {
  task: TaskCard;
}
function Task({ task }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`${classes.taskContainer}`}
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${classes.taskContainer}`}
    >
      <div className={`${classes.title}`}>{task.content.title}</div>
      <div className={`${classes.taskPropsContainer}`}>
        <div className={`${classes.propKey}`}>Category</div>
        <div className={`${classes.propValue}`}>{task.content.category}</div>
        <div className={`${classes.propKey}`}>Due Date</div>
        <div className={`${classes.propValue}`}>{task.content.dueDate}</div>
        <div className={`${classes.propKey}`}>Estimate</div>
        <div className={`${classes.propValue}`}>{task.content.estimate}</div>
        <div className={`${classes.propKey}`}>Importance</div>
        <div className={`${classes.propValueBox} ${classes.boxWarning} `}>
          Medium
        </div>
      </div>
    </div>
  );
}

export default Task;

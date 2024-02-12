import { useSortable } from "@dnd-kit/sortable";
import classes from "./taskCard.module.css";
import { CSS } from "@dnd-kit/utilities";
import { TaskItem } from "../../../types";
import { useState } from "react";
interface Props {
  task: TaskItem;
  isNewCard: boolean;
  updateTask: (id: string, title: string) => void;
}
function TaskCard({ task, updateTask, isNewCard }: Props) {
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
  if (isNewCard) {
    return (
      <form
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${classes.taskContainer} ${classes.newCard} ${classes.show}`}
        onSubmit={(e) => {}}
      >
        <div className={`${classes.title}`}>
          <input />
        </div>
        <div className={`${classes.taskPropsContainer}`}>
          <div className={`${classes.propKey}`}>Category</div>
          <div className={`${classes.propValue}`}>
            <input type="text" />
          </div>
          <div className={`${classes.propKey}`}>Due Date</div>
          <div className={`${classes.propValue}`}>
            <input type="text" />
          </div>
          <div className={`${classes.propKey}`}>Estimate</div>
          <div className={`${classes.propValue}`}>
            <input type="text" />
          </div>
          <div className={`${classes.propKey}`}>Importance</div>
          <div className={`${classes.propValue}  `}>
            <input type="text" />
          </div>
        </div>
      </form>
    );
  }
  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${classes.taskContainer}`}
      >
        <input
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => {
            console.log(e.target.value);
            updateTask(task.id, e.target.value);
          }}
          className={`${classes.input}`}
        />
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
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${classes.taskContainer}`}
    >
      <div className={`${classes.title}`} onClick={toggleEditMode}>
        {task.content.title}
      </div>
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

export default TaskCard;

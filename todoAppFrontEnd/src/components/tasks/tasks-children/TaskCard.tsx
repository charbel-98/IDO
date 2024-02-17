import { useSortable } from "@dnd-kit/sortable";
import classes from "./taskCard.module.css";
import { CSS } from "@dnd-kit/utilities";
import { TaskItem } from "../../../types";
import { useMemo, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setError } from "../../../redux/errorSlice";
interface Props {
  task: TaskItem;
  isNewCard: boolean;
  updateTask: (id: string, updatedTask: TaskItem) => void;
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}
function TaskCard({ task, updateTask, isNewCard, setTasks }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Task, setTask] = useState(task);
  console.log(Task);
  const todoData = useMemo(() => {
    return {
      title: Task.content.title,
      IsCompleted: Task.content.progress === "done" ? true : false,
      IsInProgress: Task.content.progress === "doing" ? true : false,
      EstimatedTime: Task.content.estimate,
      Importance: Task.content.importance || "High",
      DueDate: Task.content.dueDate,
      Category: Task.content.category,
    };
  }, [Task]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "title":
        setTask({
          ...Task,
          content: { ...Task.content, title: e.target.value },
        });
        break;
      case "category":
        setTask({
          ...Task,
          content: { ...Task.content, category: e.target.value },
        });
        break;
      case "dueDate":
        setTask({
          ...Task,
          content: { ...Task.content, dueDate: e.target.value },
        });
        break;
      case "estimate":
        setTask({
          ...Task,
          content: { ...Task.content, estimate: e.target.value },
        });
        break;
    }
  };
  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e);
    setTask({
      ...Task,
      content: { ...Task.content, importance: e.target.value },
    });
  };
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
  /* {
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsInProgress { get; set; }
        public string Importance { get; set; }
        public DateTime DueDate { get; set; }
        public string EstimatedTime { get; set; }
    }*/
  if (isNewCard) {
    const addNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // console.log(todoData);
      try {
        console.log("hello");
        if (Object.values(todoData).some((value) => value === "")) {
          return dispatch(
            setError({
              error: "All fields must be filled",
              errorState: true,
            })
          );
        }
        console.log("world");
        const response = await axiosPrivate.post("/Todo", todoData);
        // console.log(response.data);
        const newTask: TaskItem = {
          id: response.data.id,
          columnId: "todo",
          content: {
            title: response.data.title,
            category: response.data.category,
            dueDate: response.data.dueDate.split("T")[0],
            estimate: response.data.estimatedTime,
            importance: response.data.importance,
            progress: "todo",
          },
        };

        setTasks((prev: TaskItem[]) => {
          const removedFirstITem = prev.slice(1);
          return [newTask, ...removedFirstITem];
        });
        navigate("/");
      } catch (err) {
        // console.log(err);
        dispatch(
          setError({
            error: "Something went wrong",
            errorState: true,
          })
        );
        if ((err as any).response.data.status === 401) {
          navigate("/login");
        }
        //check for err
      }
    };
    return (
      <form
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${classes.taskContainer} ${classes.newCard} ${classes.show}`}
        onSubmit={addNewTask}
      >
        <div className={`${classes.title}`}>
          <div className={`${classes.inputTitle}`}>
            <input onChange={changeHandler} name="title" />
          </div>
          <button
            className={`${classes.trashButton}`}
            onClick={() => setTasks((prev) => prev.slice(1))}
          >
            <BsTrash />
          </button>
        </div>
        <div className={`${classes.taskPropsContainer}`}>
          <div className={`${classes.propKey}`}>Category</div>
          <div className={`${classes.propValue}`}>
            <input type="text" onChange={changeHandler} name="category" />
          </div>
          <div className={`${classes.propKey}`}>Due Date</div>
          <div className={`${classes.propValue}`}>
            <input type="date" onChange={changeHandler} name="dueDate" />
          </div>
          <div className={`${classes.propKey}`}>Estimate</div>
          <div className={`${classes.propValue}`}>
            <input type="text" onChange={changeHandler} name="estimate" />
          </div>
          <div className={`${classes.propKey}`}>Importance</div>
          <div className={`${classes.propValue}  `}>
            <select
              style={{ outline: "none" }}
              onChange={selectChangeHandler}
              name="importance"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <button type={"submit"} className={`${classes.doneButton}`}>
          Done
        </button>
      </form>
    );
  }
  if (editMode) {
    const editTask = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (Object.values(todoData).some((value) => value === "")) {
          return dispatch(
            setError({
              error: "All fields must be filled",
              errorState: true,
            })
          );
        }
        const response = await axiosPrivate.put(`/Todo/${task.id}`, todoData);
        const mappedResponseData = {
          id: response.data.id,
          columnId: response.data.IsInPogress
            ? "doing"
            : response.data.IsCompleted
            ? "done"
            : "todo",
          content: {
            title: response.data.title,
            category: response.data.category,
            dueDate: response.data.dueDate.split("T")[0],
            estimate: response.data.estimatedTime,
            importance: response.data.importance,
            progress: response.data.IsInPogress
              ? "doing"
              : response.data.IsCompleted
              ? "done"
              : "todo",
          },
        };
        updateTask(task.id, mappedResponseData);
        toggleEditMode();
        // console.log(response.data);
      } catch (err) {
        // console.log(err);
        dispatch(
          setError({
            error: (err as any).response.data.message,
            errorState: true,
          })
        );
      }
    };
    return (
      <form
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${classes.taskContainer} ${classes.newCard} ${classes.show}`}
        onSubmit={editTask}
      >
        <div className={`${classes.title}`}>
          <div className={`${classes.inputTitle}`}>
            <input
              onChange={changeHandler}
              name="title"
              value={Task.content.title}
            />
          </div>
          <button
            className={`${classes.trashButton} `}
            onClick={(e) => {
              e.stopPropagation();
              setTasks((prev) => prev);
            }}
          >
            cancel
          </button>
        </div>
        <div className={`${classes.taskPropsContainer}`}>
          <div className={`${classes.propKey}`}>Category</div>
          <div className={`${classes.propValue}`}>
            <input
              type="text"
              onChange={changeHandler}
              name="category"
              value={todoData.Category || Task.content.category}
            />
          </div>
          <div className={`${classes.propKey}`}>Due Date</div>
          <div className={`${classes.propValue}`}>
            <input
              type="date"
              onChange={changeHandler}
              name="dueDate"
              value={todoData.DueDate || Task.content.dueDate}
            />
          </div>
          <div className={`${classes.propKey}`}>Estimate</div>
          <div className={`${classes.propValue}`}>
            <input
              type="text"
              onChange={changeHandler}
              name="estimate"
              value={todoData.EstimatedTime || Task.content.estimate}
            />
          </div>
          <div className={`${classes.propKey}`}>Importance</div>
          <div className={`${classes.propValue}  `}>
            <select
              style={{ outline: "none" }}
              onChange={selectChangeHandler}
              name="importance"
              defaultValue={Task.content.importance || "High"}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div></div>
        </div>
        <button type={"submit"} className={`${classes.doneButton}`}>
          Done
        </button>
      </form>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${classes.taskContainer}`}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div
        className={`${classes.title + " " + classes.titleMargin}`}
        id="title"
        onClick={toggleEditMode}
      >
        {task.content.title}
        {mouseIsOver && (
          <button
            className={`${classes.trashButton}`}
            onClick={(e) => {
              e.stopPropagation();
              try {
                axiosPrivate.delete(`/Todo/${task.id}`);
                setTasks((prev: TaskItem[]) => {
                  return prev.filter((t) => t.id !== task.id);
                });
              } catch (err) {
                dispatch(
                  setError({
                    error: "Something went wrong while deleting the task",
                    errorState: true,
                  })
                );
              }
            }}
          >
            <BsTrash />
          </button>
        )}
      </div>
      <div className={`${classes.taskPropsContainer}`}>
        <div className={`${classes.propKey}`}>Category</div>
        <div className={`${classes.propValue}`}>{task.content.category}</div>
        <div className={`${classes.propKey}`}>Due Date</div>
        <div className={`${classes.propValue}`}>{task.content.dueDate}</div>
        <div className={`${classes.propKey}`}>Estimate</div>
        <div className={`${classes.propValue}`}>{task.content.estimate}</div>
        <div className={`${classes.propKey}`}>Importance</div>
        <div
          className={`${classes.propValueBox} ${
            task.content.importance === "Medium"
              ? classes.boxWarning
              : task.content.importance === "High"
              ? classes.boxDanger
              : classes.boxSuccess
          } `}
        >
          {task.content.importance}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

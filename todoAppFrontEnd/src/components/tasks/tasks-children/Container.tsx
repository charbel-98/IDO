import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, TaskItem } from "../../../types";
import { useMemo, useState } from "react";
import TaskProgress from "./TaskProgress";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";

interface Props {
  column: Column;
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  tasks: TaskItem[];
  headerIsShowing: boolean;
  openHeader: () => void;
  updateTask: (id: string, updatedTask: TaskItem) => void;
}
function Container({
  column,
  tasks,
  setTasks,
  headerIsShowing,
  openHeader,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const filter = useSelector((state: any) => state.search.search);
  console.log(filter);
  if (filter) {
    tasks = tasks.filter((task) => {
      return Object.values(task.content).some((x) =>
        x.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }
  const tasksIds = useMemo(() => {
    return tasks?.map((task) => task.id);
  }, [tasks]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className={"taskContainer"}></div>
    );
  }
  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        style={style}
        className={"taskContainer"}
      >
        <SortableContext items={tasksIds}>
          <TaskProgress listeners={listeners} type={column.id} />
          <div className={"splitter"}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                setTasks={setTasks}
                task={task}
                updateTask={updateTask}
                isNewCard={task.content.title === ""}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </>
  );
}

export default Container;

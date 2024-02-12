import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, TaskItem } from "../../../types";
import { useMemo, useState } from "react";
import TaskProgress from "./TaskProgress";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;

  tasks: TaskItem[];
  headerIsShowing: boolean;
  openHeader: () => void;
  updateTask: (id: string, title: string) => void;
}
function Container({
  column,
  tasks,
  headerIsShowing,
  openHeader,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
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
              <TaskCard key={task.id} task={task} updateTask={updateTask} />
            ))}
          </div>
        </SortableContext>
      </div>
    </>
  );
}

export default Container;

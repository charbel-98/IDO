import { UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, TaskCard } from "../../../types";
import { useMemo, useState } from "react";
import Task from "./Task";

interface Props {
  column: Column;

  tasks: TaskCard[];
}
function Container({ column, tasks }: Props) {
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
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={"taskContainer"}
    >
      <button
        {...listeners}
        className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl"
      >
        Drag Handle
      </button>
      <SortableContext items={tasksIds}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}

export default Container;

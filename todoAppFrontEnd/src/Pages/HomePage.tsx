import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import TodoListHeader from "../components/todoListHeader/TodoListHeader";
import Header from "../components/header/Header";
import { InfoIcon } from "../assets/Icons";
import Tasks from "../components/tasks/Tasks";
import { createPortal } from "react-dom";
import Container from "../components/tasks/tasks-children/Container";
import TaskCard from "../components/tasks/tasks-children/TaskCard";
import { Column, Id, TaskItem } from "../types";

function HomePage() {
  const defaultCols: Column[] = [
    {
      id: "todo",
      title: "Todo",
    },
    {
      id: "doing",
      title: "Work in progress",
    },
    {
      id: "done",
      title: "Done",
    },
  ];
  const defaultTasks: TaskItem[] = [
    {
      id: "1",
      columnId: "todo",
      content: {
        title: "Create user authentication",
        category: "education",
        dueDate: "2021-12-12",
        estimate: "2 hours",
        importance: "high",
        progress: "todo",
      },
    },
    {
      id: "2",
      columnId: "todo",
      content: {
        title: "bath",
        category: "education",
        dueDate: "2021-12-12",
        estimate: "2 hours",
        importance: "high",
        progress: "todo",
      },
    },
    {
      id: "3",
      columnId: "doing",
      content: {
        title: "toilets",
        category: "education",
        dueDate: "2021-12-12",
        estimate: "2 hours",
        importance: "high",
        progress: "doing",
      },
    },
    {
      id: "4",
      columnId: "doing",
      content: {
        title: "read",
        category: "education",
        dueDate: "2021-12-12",
        estimate: "2 hours",
        importance: "high",
        progress: "doing",
      },
    },
    {
      id: "5",
      columnId: "done",
      content: {
        title: "learn dnd-kit",
        category: "education",
        dueDate: "2021-12-12",
        estimate: "2 hours",
        importance: "high",
        progress: "done",
      },
    },
    {
      id: "6",
      columnId: "done",
      content: {
        title: ".net-core",
        category: "education",
        dueDate: "2021-12-12",
        estimate: "2 hours",
        importance: "high",
        progress: "done",
      },
    },
    {
      id: "7",
      columnId: "done",
      content: {
        title: "fuck off",
        category: "education",
        dueDate: "2021-12-12",
        estimate: "2 hours",
        importance: "high",
        progress: "done",
      },
    },
    {
      id: "8",
      columnId: "todo",
      content: {
        title: "hello",
        category: "education",
        dueDate: "2021-12-12",
        estimate: "2 hours",
        importance: "high",
        progress: "todo",
      },
    },
    {
      id: "9",
      columnId: "todo",
      content: {
        title: "Create user authentication",
        category: "education",
        dueDate: "2021-12-12",
        estimate: "2 hours",
        importance: "high",
        progress: "todo",
      },
    },
  ];
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<TaskItem[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<TaskItem | null>(null);
  const [headerIsShowing, setHeaderIsShowing] = useState(true);

  const closeHeader = () => {
    setHeaderIsShowing(false);
  };
  const openHeader = () => {
    setHeaderIsShowing(true);
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <SortableContext items={columnsId}>
        <div className={"fixed"}>
          <Header nbTasks={tasks.length} setTasks={setTasks} />
          {headerIsShowing && <TodoListHeader clickHandler={closeHeader} />}
          <div
            style={{
              height: "32px",
            }}
          ></div>
        </div>

        <Tasks
          openHeader={openHeader}
          headerIsShowing={headerIsShowing}
          columns={columns}
          tasks={tasks}
          updateTask={updateTask}
        ></Tasks>
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <Container
              openHeader={openHeader}
              headerIsShowing={headerIsShowing}
              column={activeColumn}
              updateTask={updateTask}
              tasks={tasks.filter((task) => task.columnId === activeColumn?.id)}
            />
          )}
          {activeTask && (
            <TaskCard
              task={activeTask}
              updateTask={updateTask}
              isNewCard={false}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
  function updateTask(id: Id, title: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content: { ...task.content, title } };
    });

    setTasks(newTasks);
  }
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId.toString();
        tasks[activeIndex].content.progress = overId.toString();
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

export default HomePage;

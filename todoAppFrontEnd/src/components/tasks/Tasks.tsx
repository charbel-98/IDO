import Container from "./tasks-children/Container";
import { Column, TaskItem } from "../../types";
import { InfoIcon } from "../../assets/Icons";
import { SetStateAction } from "react";
import { Dispatch } from "@reduxjs/toolkit";

interface Props {
  columns: Column[];
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  headerIsShowing: boolean;

  openHeader: () => void;
  updateTask: (id: string, updatedTask: TaskItem) => void;
}

function Tasks({
  columns,
  tasks,
  setTasks,
  headerIsShowing,

  updateTask,
  openHeader,
}: Props) {
  return (
    <div className="container">
      {columns.map((col) => (
        <Container
          updateTask={updateTask}
          openHeader={openHeader}
          headerIsShowing={headerIsShowing}
          key={col.id}
          column={col}
          tasks={tasks.filter((task) => task.columnId === col.id)}
          setTasks={setTasks}
        ></Container>
      ))}
      {!headerIsShowing && (
        <div className="infoIconContainer">
          <InfoIcon clickHandler={openHeader} styleClasses={"infoIcon"} />
        </div>
      )}
    </div>
  );
}
export default Tasks;

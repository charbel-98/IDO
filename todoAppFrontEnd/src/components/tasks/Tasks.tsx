import Container from "./tasks-children/Container";
import { Column, TaskItem } from "../../types";
import { InfoIcon } from "../../assets/Icons";

interface Props {
  columns: Column[];
  tasks: TaskItem[];
  activeColumn: Column | null;
  activeTask: TaskItem | null;
  headerIsShowing: boolean;
  openHeader: () => void;
  updateTask: (id: string, title: string) => void;
}

function Tasks({
  columns,
  tasks,
  activeColumn,
  activeTask,
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
        ></Container>
      ))}
    </div>
  );
}
export default Tasks;

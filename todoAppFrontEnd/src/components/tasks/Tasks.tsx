import Container from "./tasks-children/Container";
import { Column, TaskItem } from "../../types";

interface Props {
  columns: Column[];
  tasks: TaskItem[];

  headerIsShowing: boolean;

  openHeader: () => void;
  updateTask: (id: string, title: string) => void;
}

function Tasks({
  columns,
  tasks,

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

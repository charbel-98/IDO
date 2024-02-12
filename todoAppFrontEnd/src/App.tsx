import { useState } from "react";
import "./App.css";
import { InfoIcon } from "./assets/Icons";
import Header from "./components/header/Header";
import TodoListHeader from "./components/todoListHeader/TodoListHeader";
import TaskProgress from "./components/tasks/tasks-children/TaskProgress";
import Tasks from "./components/tasks/Tasks";

import {
  todoTasks,
  doingTasks,
  doneTasks,
} from "./components/tasks/tasks-children/tasksData.js";

function App() {
  const [headerIsShowing, setHeaderIsShowing] = useState(true);

  const closeHeader = () => {
    setHeaderIsShowing(false);
  };
  const openHeader = () => {
    setHeaderIsShowing(true);
  };

  return (
    <main>
      <div className={"fixed"}>
        <Header />
        {headerIsShowing && <TodoListHeader clickHandler={closeHeader} />}
        <div className="container">
          <div className={"progressContainer"}>
            <TaskProgress type={"doing"} />
            <TaskProgress type={"todo"} />
            <TaskProgress type={"done"} />
          </div>
          <div>
            {!headerIsShowing && (
              <InfoIcon clickHandler={openHeader} styleClasses={"infoIcon"} />
            )}
          </div>
        </div>
      </div>
      <Tasks></Tasks>
    </main>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { InfoIcon } from "./assets/Icons";
import Header from "./components/header/Header";
import TaskList from "./components/taskList/TaskList";
import TodoListHeader from "./components/todoListHeader/TodoListHeader";
import TaskProgress from "./components/UI/TaskProgress";

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
      <div className="container">
        <div className="taskContainer">
          <TaskList />
        </div>
      </div>
    </main>
  );
}

export default App;

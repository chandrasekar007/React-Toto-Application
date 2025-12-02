import "./App.css";

import TodoProvider from "./components/TodoProvider";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <h3 className="h3">TOTO-APPLICATION</h3>
        <TodoInput />
        <TodoList />
      </div>
    </TodoProvider>

  );
}

export default App;


import "./App.css";
import { TodoProvider } from "./Context/Todocontext";

import TodoInput from "./Components/TodoInput";

import TodoList from "./Components/TodoList";

function App() {

  return (
    <TodoProvider>
      <div className="App">
        <h3 className="h3">TODO-APPLICATION</h3>
        <TodoInput />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
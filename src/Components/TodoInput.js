
import { useTodo } from "../Context/Todocontext";

function TodoInput() {
  const { input, setInput, adddata } = useTodo();

  return (
    <div>
      <input
        type="text"
        value={input}
        name="task"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter The Task"
      />
      <button className="abtn" onClick={adddata}>
        ADD+
      </button>
    </div>
  );
}

export default TodoInput;

import { useTodo } from "../Context/Todocontext";
import TodoItem from "./TodoItem";

function TodoList() {
  const { todos } = useTodo();

  return (
    <div className="task-items" style={{ marginTop: '20px' }}>
      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No Data</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todotask, index) => (
            <TodoItem key={index} todotask={todotask} index={index} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
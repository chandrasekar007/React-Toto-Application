import { useContext } from "react";
import TodoContext from "./TodoContext";

export default function TodoList() {
  const { todos, check, edits, del } = useContext(TodoContext);

  return (
    <div className="task-items">
      <ul>
        {todos.map((todotask, index) => (
          <li className="card" key={index}>
            <input
              type="checkbox"
              onChange={() => check(index)}
              checked={todotask.checked}
            />

            <h3
              style={{
                textDecoration: todotask.checked ? "line-through" : "none",
              }}
            >
              {todotask.data}
            </h3>

            <button className="ebtn" onClick={() => edits(index)}>
              Edit
            </button>

            <button className="dbtn" onClick={() => del(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

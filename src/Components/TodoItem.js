
import { useTodo } from "../Context/Todocontext";

function TodoItem({ todotask, index }) {

  const { check, edits, del } = useTodo();

  return (
    <li className="card" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }}>
      <input
        type="checkbox"
        onChange={() => check(index)}
        checked={todotask.checked}
      />

      <h3
        id="ch"
        style={{
          textDecoration:todotask.checked ? "line-through" : "none",
          flex: 1,
          margin: 0
        }}
      >
        
      <p id="textmark" style={{ margin: 0 }}>{todotask.data}</p>
      </h3>
      <div style={{ display: 'flex', gap: '5px' }}>
        <button className="ebtn" onClick={() => edits(index)}>
          Edit
        </button>
        <button className="dbtn" onClick={() => del(index)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
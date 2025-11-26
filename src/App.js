import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("totos")) || []
  );

  useEffect(() => {
    localStorage.setItem("totos", JSON.stringify(todos));
  }, [todos]);

  const [input, setInput] = useState("");

  const [edit, setEdit] = useState(null);

  function adddata() {
    if (input === "") {
      alert("please ender any Task");
    } else {
      if (edit !== null) {
        const copy = [...todos];

        copy[edit] = { ...copy[edit], data: input };

        console.log(todos);

        setTodos(copy);

        setEdit(null);
      } else {
        setTodos([...todos, { checked: false, data: input }]);
      }
    }
    setInput("");
  }

  const edits = (index) => {
    setInput(todos[index].data);
    setEdit(index);
  };

  const del = (index) => {
    const newtoto = todos.filter((_, i) => i !== index);
    setTodos(newtoto);
  };

  function check(index) {
    const copytodos = [...todos];
    copytodos[index].checked = !copytodos[index].checked;
    setTodos(copytodos);
  }

  return (
    <div className="App">
      <h3 className="h3">TOTO-APPLICATION</h3>

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

      <div className="task-items">
        <ul>
          {todos.map((todotask, index) => (
            <li className="card" key={index} style={{}}>
              <input
                type="checkbox"
                onChange={() => check(index)}
                checked={todotask.checked}
              />

              <h3
                id={"ch"}
                style={{
                  textDecoration: todotask.checked ? "line-through" : "none",
                }}
              >
                <p id="textmark">{todotask.data}</p>
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
    </div>
  );
}

export default App;


import { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();


export function TodoProvider({ children }) {

  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const fetchData = async () => {
      const url ="https://jsonplaceholder.typicode.com/todos";


      const res = await fetch(url);
      const data = await res.json();

      setTodos(
        data.slice(0, 5).map((item) => ({
          checked: item.completed,
          data: item.title,
        }))
      );
    };
    fetchData();
  }, []);


  const adddata = () => {
    if (input === "") {
      alert("Add Task");
    } else {
      if (edit !== null) {

        const copy = [...todos];
        copy[edit] = { ...copy[edit], data: input };
        setTodos(copy);
        setEdit(null);
      } else {

        setTodos([...todos, { checked: false, data: input }]);
      }
    }
    setInput("");
  };


  const edits = (index) => {
    setInput(todos[index].data);
    setEdit(index);
  };

  const del = (index) => {
    const newtodo = todos.filter((_, i) => i !== index);
    setTodos(newtodo);
  };


  const check = (index) => {
    const copytodos = [...todos];
    copytodos[index].checked = !copytodos[index].checked;
    setTodos(copytodos);
  };

  const value = {
    todos,input,setInput,edit,adddata,edits,del,check,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Error...!");
  }
  return context;
}
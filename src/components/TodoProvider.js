import { useState, useEffect } from "react";
import TodoContext from "./TodoContext";

export default function TodoProvider({children }) {

     console.log(url);
     const [todos, setTodos] = useState(

        () => JSON.parse(localStorage.getItem("totos")) || []

      );

const url=process.env.REACT_APP_API_URL;

      useEffect(() => {

      const fetchData = async () => {

          const res = await fetch(url);
          const data = await res.json();

          setTodos(

            data.slice(0, 7).map(item => ({

              checked: item.completed,
              data: item.title

            }))

          );


      };

      fetchData();
    }, []);

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

      const values = {todos,setTodos,input,setInput,check,del,edits,adddata
  };


  return (
    <TodoContext.Provider value={values}>
      {children}
    </TodoContext.Provider>
  )
}

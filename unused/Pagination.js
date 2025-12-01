// src/context/TodoContext.js

import { createContext, useContext, useState, useEffect } from "react";

// 1. Context உருவாக்குறோம்
const TodoContext = createContext();

// 2. Provider Component - எல்லா logic-உம் இங்க
export function TodoProvider({ children }) {
  // State
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // LocalStorage save பண்றது
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // API-ல இருந்து data fetch பண்றது
  useEffect(() => {
    const fetchData = async () => {
      const url = "https://jsonplaceholder.typicode.com/todos";
      const res = await fetch(url);
      const data = await res.json();

      setTodos(
        data.slice(0, 50).map((item) => ({
          checked: item.completed,
          data: item.title,
        }))
      );
    };
    fetchData();
  }, []);

  // Add/Edit function
  const adddata = () => {
    if (input === "") {
      alert("Please enter any Task");
    } else {
      if (edit !== null) {
        // Edit existing todo
        const copy = [...todos];
        copy[edit] = { ...copy[edit], data: input };
        setTodos(copy);
        setEdit(null);
      } else {
        // Add new todo
        setTodos([...todos, { checked: false, data: input }]);
        // புதுசா add பண்ணும்போது last page-க்கு போ
        const newTotalPages = Math.ceil((todos.length + 1) / itemsPerPage);
        setCurrentPage(newTotalPages);
      }
    }
    setInput("");
  };

  // Edit function
  const edits = (index) => {
    const actualIndex = (currentPage - 1) * itemsPerPage + index;
    setInput(todos[actualIndex].data);
    setEdit(actualIndex);
  };

  // Delete function
  const del = (index) => {
    const actualIndex = (currentPage - 1) * itemsPerPage + index;
    const newtodo = todos.filter((_, i) => i !== actualIndex);
    setTodos(newtodo);

    // Last item delete ஆனா previous page-க்கு போ
    if (currentTodos.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Checkbox toggle function
  const check = (index) => {
    const actualIndex = (currentPage - 1) * itemsPerPage + index;
    const copytodos = [...todos];
    copytodos[actualIndex].checked = !copytodos[actualIndex].checked;
    setTodos(copytodos);
  };

  // Pagination calculations
  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos = todos.slice(startIndex, endIndex);

  // Pagination functions
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // எல்லா data-யும் value-ல pass பண்றோம்
  const value = {
    todos,
    currentTodos,
    input,
    setInput,
    edit,
    adddata,
    edits,
    del,
    check,
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// 3. Custom Hook - Easy-யா use பண்ண
export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within TodoProvider");
  }
  return context;
}
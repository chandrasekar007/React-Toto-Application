import { useState, useEffect, useContext} from "react";
import TodoContext from "./TodoContext";


export default function TodoInput() {
    const { input, setInput, adddata } = useContext(TodoContext);
  return (
    <div>
      <input
        type="text" value={input} onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Task"
      /><button className="abtn" onClick={adddata}>
        ADD+
      </button>
    </div>
  )
}

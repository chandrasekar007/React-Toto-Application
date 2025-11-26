import { useState } from "react"

function App2()
{
     const [textes,setText]=useState("");
    function add()
    {
        
        setText(...textes)

    }
    return(
        <>
        <input type="text" value={textes} onChange={setText((e)=>{e.target.value})} />
        <button onClick={add()}>Add</button>
        </>
    )
}
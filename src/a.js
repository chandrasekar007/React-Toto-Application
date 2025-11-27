import React, { useState } from 'react'

function View() {

    const [data,setData]=useState([]);

  const url="https://jsonplaceholder.typicode.com/todos";
    const fetchdata=()=>
    {
        fetchdata(url)
        .then((res)=>res.JSON())
        .then((data)=>setData(data))
    }
  return (
    <div>
        <h1>Hello Developement</h1>
        <table>
            <thead>
            <tr>
                <tr>Action</tr>
                <td>Id</td>
                <td>title</td>
            </tr>
            </thead>
            <tbody>
                {
                    data.map((data,index)=>
                    {

                 <tr key={index}>
                    <td><input type="checkbox" /></td>
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    
                 </tr>

                    }
                    )
                }
            
            </tbody>
        </table>
    </div>
  )
}

export default View;

import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const baseUrl = "http://localhost:8080"

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(()=> {
    getTodos();
  }, []);

  async function getTodos(){
    await axios
    .get(baseUrl+"/todo")
    .then((response)=>{
      setTodos(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  function changeText(e){
    e.preventDefault();
    setInput(e.target.value)
  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form>
        <label>
        Todo &nbsp;
        <input type="text" required={true} value={input} onChange={changeText}/>
        </label>
        <input type="submit" value="create"/>
      </form>

      {
        todos
        ? todos.map((todo)=>{
          return(
            <div className="todo">
              <h3>
                <label onClick={null}>
                  {todo.todoName}
                </label>
              </h3>
            </div>
          )
        }) 
        : null
      }
    </div>
  );
}

export default App;

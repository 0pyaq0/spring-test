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

  function insertTodo(e){
    e.preventDefault();

    const insertTodo = async() => {
      await axios
            .post(baseUrl + "/todo", {
              todoName:input
            })
            .then((response) => {
              console.log(response.data)
              setInput("");
              getTodos();
            })
            .catch((error)=>{
              console.error(error);
            })
    }
    insertTodo();
    console.log("할일 추가되었음")
  }

  function updateTodo(id){
    const updateTodo = async() => {
      await axios
            .put(baseUrl + "/todo/" + id, {})
            .then((response) => {
              console.log(response.data)
              getTodos();
            })
            .catch((error)=>{
              console.error(error);
            })
    }
    updateTodo();
  }

  function changeText(e){
    e.preventDefault();
    setInput(e.target.value)
  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={insertTodo}>
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
            <div className="todo" key={todo.id}>
              <h3>
                <label 
                className={todo.completed ? "completed" : null}
                onClick={() => updateTodo(todo.id)}>
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

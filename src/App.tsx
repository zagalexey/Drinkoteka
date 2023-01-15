import "./styles/App.css";
import Button from "./components/Button";
import axios from "axios";
import { useState } from "react";
import { ITodo } from "./models";

function App() {
  const [todos, setTodos] = useState<ITodo | null>(null);

  const fetchData = (): void => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => setTodos(res.data))
      .catch((e) => console.log(e));
  };

  const deleteData = (): void => {
    setTodos(null);
  };

  const btn1 = {
    name: "Kozel",
    price: 20,
  };
  const btn2 = {
    name: "Plzen",
    price: 30,
  };

  return (
    <div className={"container"}>
      <div>
        <Button data={btn1} onClick={fetchData} />
        <Button data={btn2} onClick={fetchData} />
        <Button text={"Delete data"} onClick={deleteData} />
      </div>
      <div>
        {todos && (
          <ul>
            <li>
              <h3>{todos.title}</h3>
              <span>{todos.completed}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

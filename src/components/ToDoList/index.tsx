import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo, useTodos } from "./ToDoContext";
import "./ToDoList.scss";

function ToDoList() {
  const { todos, addTodo, deleteTodo, toggleCompletion } = useTodos();
  const [newTodoDescription, setNewTodoDescription] = useState("");

  const handleAddTodo = () => {
    if (!newTodoDescription.trim()) return;
    addTodo({
      id: uuidv4(),
      description: newTodoDescription,
      completed: false,
    });
    setNewTodoDescription("");
  };

  return (
    <div className="todoContainer">
      <h2 className="title">Your To-Dos</h2>
      <input
        type="text"
        value={newTodoDescription}
        onChange={(e) => setNewTodoDescription(e.target.value)}
        className="todoInput"
        placeholder="Enter To-do"
      />
      <button onClick={handleAddTodo} className="addButton">
        Add To-do
      </button>
      <ul className="todoList">
        {todos && todos.length ? (
          todos.map((todo: Todo) => (
            <li key={todo.id} className="todoItem">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo.id)}
              />
              <span className={`todoText ${todo.completed ? "completed" : ""}`}>
                {todo.description}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="deleteButton"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="title" style={{ color: '#FFAC1C' }}>Currently, there are no To-Dos.</p>
        )}
      </ul>
    </div>
  );
}

export default ToDoList;

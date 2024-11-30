import React, { useState } from "react";
import { ListGroup, InputGroup, Form, Button } from "react-bootstrap";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Örnek görev 1", completed: false },
    { id: 2, text: "Örnek görev 2", completed: true },
  ]);
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        text: newTodoText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
      // Backend endpoint: POST /api/todos
      // Backend'de yeni görev ekleme kodu buraya gelecek
    }
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    // Backend endpoint: PUT /api/todos/:id
  };

  return (
    <>
      <h1>To-Do List</h1>
      <p style={{ fontStyle: "italic" }}>Click to mark completed tasks</p>
      <ListGroup className="mb-3">
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            onClick={() => handleToggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
              backgroundColor: "#fff",
              color: "#000",
            }}
          >
            {todo.text}
            <Form.Check
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              style={{ float: "right" }}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Yeni görev girin..."
          aria-label="Yeni görev"
          aria-describedby="basic-addon2"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleAddTodo}>
          Add
        </Button>
      </InputGroup>
    </>
  );
};

export default TodoList;

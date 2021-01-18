import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Grid,
} from "@material-ui/core";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import Nav from "./Nav";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().task }))
        );
      });
  }, []);

  const InputEvent = (e) => {
    setText(e.target.value);
  };

  const AddTodo = () => {
    if (text.trim()) {
      db.collection("todos").add({
        task: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setText("");
    }
  };

  return (
    <div className="App">
      <Nav text="Todo App By Harish" />
      <form onSubmit={(e) => e.preventDefault()}>
        <FormControl>
          <InputLabel>✔ Write a Todo</InputLabel>
          <Input
            style={{ fontSize: "20px" }}
            type="text"
            value={text}
            onChange={InputEvent}
          />
        </FormControl>
        <Button
          disabled={!text.trim()}
          onClick={AddTodo}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Todo
        </Button>
      </form>
      <div className="App__todos">
        {todos.map((item) => (
          <Todo todo={item} />
        ))}
      </div>
    </div>
  );
}

export default App;

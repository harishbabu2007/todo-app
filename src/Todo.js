import React, { useState } from "react";
import "./Todo.css";
import {
  IconButton,
  Modal,
  Button,
  Input,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import db from "./firebase";
import firebase from "firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo({ todo }) {
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [text, setText] = useState("");
  const classes = useStyles();

  const updateTodo = () => {
    if (text.trim()) {
      db.collection("todos").doc(todo.id).set(
        {
          task: text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      setOpen(false);
      setText("");
    }
  };

  return (
    <React.Fragment>
      <Modal open={open}>
        <div style={modalStyle} className={classes.paper}>
          <h1 style={{ marginBottom: "20px" }}>Edit Todo</h1>
          <InputLabel>Update "{todo.todo}"</InputLabel>
          <Input
            style={{ fontSize: "20px", marginBottom: "20px" }}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <Button
            variant="outlined"
            onClick={(e) => setOpen(false)}
            color="primary"
            onClick={updateTodo}
            style={{ marginRight: "10px" }}
            disabled={!text.trim()}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => setOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <div className="todo__list">
        <h2>{todo.todo}</h2>
        <IconButton onClick={(e) => setOpen(true)}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton
          onClick={(event) => {
            db.collection("todos").doc(todo.id).delete();
          }}
          color="secondary"
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
    </React.Fragment>
  );
}

export default Todo;

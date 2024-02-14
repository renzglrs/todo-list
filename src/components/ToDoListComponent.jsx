import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import ToDoItemComponent from "./ToDoItemComponent";

const ToDoListComponent = () => {
  const inputRef = useRef();
  const [item, setItem] = useState("");
  const [listItems, setListItems] = useState([]);
  const [errors, setErrors] = useState("");

  const handleAddItem = () => {
    if (item) {
      setListItems([...listItems, { id: uuid(), name: item }]);
      setItem("");
      setErrors("");
    } else {
      setErrors("Item cannot be empty.");
      inputRef.current.focus();
    }
  };

  const handleEditItem = (id, newItem) => {
    const updatedGroceryItems = listItems.map((item) => {
      if (item.id === id) {
        return { ...item, name: newItem };
      }

      return item;
    });
    setListItems(updatedGroceryItems);
  };

  const handleDeleteItem = (removeID) => {
    const filteredItems = listItems.filter((item) => item.id !== removeID);
    setListItems(filteredItems);
  };

  const handleClearItems = () => {
    setListItems([]);
  };

  return (
    <div className="todo-main">
      <h1>To-Do List</h1>
      <div className="input-section">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter an item..."
            value={item}
            onChange={(event) => setItem(event.target.value)}
          />
          <button className="btn-add" onClick={handleAddItem}>
            Add Item
          </button>
        </div>
        <div>{errors ? <p className="errors">{errors}</p> : null}</div>
      </div>
      <ul className="todo-list">
        {listItems.map((item) => (
          <ToDoItemComponent
            key={item.id}
            item={item}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
      {listItems.length > 0 ? (
        <button onClick={handleClearItems} className="btn-clear">
          Clear Items
        </button>
      ) : null}
    </div>
  );
};

export default ToDoListComponent;

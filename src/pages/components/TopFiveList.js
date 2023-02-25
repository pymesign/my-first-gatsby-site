import React, { useState } from "react";

const TopFiveList = () => {
  const [items, setItems] = useState([
    { id: 1, content: "Item 1" },
    { id: 2, content: "Item 2" },
    { id: 3, content: "Item 3" },
    { id: 4, content: "Item 4" },
    { id: 5, content: "Item 5" },
  ]);

  const handleChange = (e, id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.content = e.target.value;
        }
        return item;
      })
    );
  };

  const handleSubmit = (event) => {
    //aqui el evento que guarda
    event.preventDefault();
    console.log("saving");
  };

  const [draggedItem, setDraggedItem] = useState(null);

  const onDragStart = (e, index) => {
    setDraggedItem(index);
  };

  const onDragOver = (index) => {
    const draggedOverItem = items[index];

    if (draggedOverItem === draggedItem) {
      return;
    }

    let itemsCopy = [...items];

    itemsCopy.splice(index, 0, itemsCopy.splice(draggedItem, 1)[0]);

    setItems(itemsCopy);
    setDraggedItem(index);
  };

  const itemElements = items.map((item, index) => (
    <div
      key={item.id}
      className="item"
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={() => onDragOver(index)}
      draggable
    >
      <div>
        Item {index + 1}:
        <input
          type="text"
          value={item.content}
          onChange={(e) => handleChange(e, item.id)}
        />
      </div>
    </div>
  ));

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h2>Top Five List</h2>

      {itemElements}

      <button type="submit">Save</button>
    </form>
  );
};

export default TopFiveList;

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TopFiveList = () => {
  const [list, setList] = useState({
    id: uuidv4(),
    title: "My Top Five List",
    items: [
      { id: uuidv4(), content: "Item 1" },
      { id: uuidv4(), content: "Item 2" },
      { id: uuidv4(), content: "Item 3" },
      { id: uuidv4(), content: "Item 4" },
      { id: uuidv4(), content: "Item 5" },
    ],
  });

  const handleChange = (e, id) => {
    setList((prevList) => {
      const newItems = prevList.items.map((item) => {
        if (item.id === id) {
          return { ...item, content: e.target.value };
        }
        return item;
      });
      return { ...prevList, items: newItems };
    });
  };

  const handleTitleChange = (e) => {
    setList((prevState) => {
      return { ...prevState, title: e.target.value };
    });
  };

  const handleSave = () => {
    try {
      const savedLists = JSON.parse(localStorage.getItem("topFiveLists")) || [];
      const newList = {
        id: list.id,
        title: list.title,
        items: list.items.map((item) => ({ content: item.content })),
      };
      savedLists.push(newList);
      localStorage.setItem("topFiveLists", JSON.stringify(savedLists));
      resetForm();
      console.log("Data saved: ", newList);
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };
  const resetForm = () => {
    setList({
      id: uuidv4(),
      title: "",
      items: [
        { id: uuidv4(), content: "" },
        { id: uuidv4(), content: "" },
        { id: uuidv4(), content: "" },
        { id: uuidv4(), content: "" },
        { id: uuidv4(), content: "" },
      ],
    });
  };

  const [draggedItem, setDraggedItem] = useState(null);

  const onDragStart = (e, index) => {
    setDraggedItem(index);
  };

  const onDragOver = (index) => {
    const draggedOverItem = list.items[index];

    if (draggedOverItem === draggedItem) {
      return;
    }

    let itemsCopy = [...list.items];

    itemsCopy.splice(index, 0, itemsCopy.splice(draggedItem, 1)[0]);

    setList((prevState) => {
      return { ...prevState, items: itemsCopy };
    });
    setDraggedItem(index);
  };

  return (
    <>
      <div>
        <label htmlFor="title">List Title:</label>
        <input
          type="text"
          id="title"
          value={list.title}
          onChange={handleTitleChange}
        />
      </div>
      <ol className="container">
        {list.items.map((item, index) => (
          <li
            key={item.id}
            className="item"
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={() => onDragOver(index)}
            draggable
          >
            <input
              type="text"
              value={item.content}
              onChange={(e) => handleChange(e, item.id)}
            />
          </li>
        ))}
        <button onClick={handleSave}>Save</button>
      </ol>
    </>
  );
};

export default TopFiveList;

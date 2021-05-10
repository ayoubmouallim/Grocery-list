import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ deleteItem, items, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        return (
          <article key={item.id} className="grocery-item">
            <div className="title">{item.title}</div>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(item.id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteItem(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;

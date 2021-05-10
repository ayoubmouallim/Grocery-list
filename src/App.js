import React, { useState } from "react";
import Alert from "./Alert";
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) return JSON.parse(list);
  return [];
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsediting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  React.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("salam");
    if (!name) setAlert({ show: true, msg: "field is empty", type: "danger" });
    else if (name && isEditing) {
      setAlert({ show: true, msg: "field is changed", type: "success" });
      setList(
        list.map((item) => {
          if (item.id === editId) return { ...item, title: name };
          return item;
        })
      );
      setEditId(false);

      setEditId(null);
      setName("");
    } else {
      setAlert({ show: true, msg: "name is added", type: "success" });
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  function deleteItem(id) {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  }

  function editItem(id) {
    const specificItem = list.find((item) => item.id === id);
    setIsediting(true);
    setEditId(specificItem.id);
    setName(specificItem.title);
  }

  const clearList = () => {
    setAlert({ show: true, msg: "list cleared", type: "danger" });
    setList([]);
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert
            alert={alert}
            removeAlert={() => setAlert({ show: false, msg: "", type: "" })}
            list={list}
          />
        )}
        <h3>Grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="e.g. eggs "
            className="grocery"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear
          </button>
        </div>
      )}
    </section>
  );
}

export default App;

import React, { useState } from "react";
import Model from "./Model";
import { data } from "../api";

const UseReducer = () => {
  const [name, setName] = useState("");
  const [people, setPeople] = useState(data);
  const [showModel, setShowModel] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name) {
      setShowModel(true);
      setPeople([...people, { id: new Date().getTime().toString, name }]);

      setName("");
    } else {
      setShowModel(true);
    }
  };

  return (
    <>
      {showModel && <Model />}

      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <button type="submit">add</button>
      </form>

      {/* show list */}
      {people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id}>
            <h4>{name}</h4>
          </div>
        );
      })}
    </>
  );
};

export default UseReducer;

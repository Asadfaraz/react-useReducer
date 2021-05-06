import React, { useState, useReducer } from "react";
import Model from "./Model";
import { data } from "../api";

const reducer = (state, action) => {
  // later
};
const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: "",
};

const UseReducer = () => {
  const [name, setName] = useState("");
  //   const [people, setPeople] = useState(data);
  //   const [showModel, setShowModel] = useState(false);
  // starting useReducer
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name) {
    } else {
    }
  };

  return (
    <>
      {state.isModalOpen && <Model modalContent={state.modalContent} />}

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
      {state.people.map((person) => {
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

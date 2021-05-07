import React, { useState, useReducer } from "react";
import Model from "./Model";
import { data } from "../api";

const reducer = (state, action) => {
  console.log(state);
  if (action.type == "ADD_ITEM") {
    const newPeople = [...state.people, action.payload];

    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: "item aded",
    };
  }

  if (action.type == "NO_VALUE") {
    return { ...state, isModalOpen: true, modalContent: "Please enter value" };
  }

  throw new Error("no matching action type");
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
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setName("");
    } else {
      dispatch({ type: "NO_VALUE" });
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

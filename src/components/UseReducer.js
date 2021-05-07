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

  if (action.type == "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  }

  if (action.type == "REMOVE_ITEM") {
    const newPeople = state.people.filter((person) => {
      return person.id !== action.payload;
    });

    return { ...state, people: newPeople };
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

  // Form submission function
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

  // Closing modal function
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  // Return START from HERE

  return (
    <>
      {state.isModalOpen && (
        <Model modalContent={state.modalContent} closeModal={closeModal} />
      )}

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
          <div key={id} className="item">
            <h4>{name}</h4>
            <button
              onClick={() => {
                dispatch({ type: "REMOVE_ITEM", payload: id });
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default UseReducer;

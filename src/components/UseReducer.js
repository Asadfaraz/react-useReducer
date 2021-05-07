import React, { useState, useReducer } from "react";
import Model from "./Model";
import { data } from "../api";
import { reducer } from "./reducer";

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

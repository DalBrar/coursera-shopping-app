import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const ItemSelected = (props) => {
  const { dispatch, Currency, Remaining } = useContext(AppContext);

  const [name, setName] = useState("");
  const [allocation, setAllocation] = useState("");
  const [action, setAction] = useState("");

  const submitEvent = () => {
    // regex for numbers and backspaces only
    const re = /^[0-9\b]+$/;
    // Ensure we accept only numbers in the allocation field
    let isNumberOnly = re.test(allocation);
    if (!isNumberOnly) { alert("The allocation amount can only be a number."); }

    // Ensure the number does not exceed remaining budget
    if (allocation > Remaining) {
      alert("The value cannot exceed remaining funds (" + Remaining + ")");
    }

    const item = {
      name: name,
      allocation: parseInt(allocation),
    };

    if (action === "Reduce") {
      dispatch({
        type: "DECREASE",
        payload: item,
      });
    } else {
      dispatch({
        type: "INCREASE",
        payload: item,
      });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="input-group mb-3" style={{ marginLeft: "2rem" }}>
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            onChange={(event) => setName(event.target.value)}
          >
            <option defaultValue>Choose...</option>
            <option value="Marketing" name="Marketing">Marketing</option>
            <option value="Finance" name="Finance">Finance</option>
            <option value="Sales" name="Sales">Sales</option>
            <option value="Human Resource" name="Human Resource">Human Resource</option>
            <option value="IT" name="IT">IT</option>
          </select>

          <div className="input-group-prepend" style={{ marginLeft: "2rem" }}>
            <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect02"
            onChange={(event) => setAction(event.target.value)}
          >
            <option defaultValue value="Add" name="Add">Add</option>
            <option value="Reduce" name="Reduce">Reduce</option>
          </select>

          <div className="input-group-prepend" style={{ marginLeft: "2rem" }}>
            <label className="input-group-text" htmlFor="cost">{Currency}</label>
          </div>
          <input
            required="required"
            type="number"
            id="cost"
            value={allocation}
            style={{ size: 10 }}
            onChange={(event) => setAllocation(event.target.value)}
          ></input>

          <button
            className="btn btn-primary"
            onClick={submitEvent}
            style={{ marginLeft: "2rem" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemSelected;

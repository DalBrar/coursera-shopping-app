import React, { createContext, useReducer } from "react";

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    let new_departments = [];

    switch (action.type) {
        case "INCREASE":
            // regex for numbers and backspaces only
            const re = /^[0-9\b]+$/;

            state.departments.map((department) => {
                // Ensure we accept only numbers in the allocation field
                let isNumberOnly = re.test(action.payload.allocation);
                // Ensure the number does not exceed remaining budget
                let lessThanOrEqualToRemaining = state.Remaining >= action.payload.allocation;

                if (department.name === action.payload.name && isNumberOnly && lessThanOrEqualToRemaining) {
                    department.allocation += action.payload.allocation;
                }
                new_departments.push(department);
                return true;
            });
            state.departments = new_departments;
            action.type = "DONE";
            return {
                ...state,
            };
    
        case "DECREASE":
            state.departments.map((department) => {
                if (department.name === action.payload.name) {
                    department.allocation -= action.payload.allocation;
                }
                department.allocation = department.allocation < 0 ? 0 : department.allocation;
                new_departments.push(department);
                return true;
            });
            state.departments = new_departments;
            action.type = "DONE";
            return {
                ...state,
            };
      
        case "CHANGE_CURRENCY":
          action.type = "DONE";
          state.Currency = action.payload;
          return {
              ...state,
          };

        case "CHANGE_BUDGET":
          action.type = "DONE";
          // Do not allow amount lower than amount spent so far
          let notLowerThanSpent = action.payload >= state.Spent;
          // Set upper limit to 20,000
          let lowerThanUpperLimit = action.payload <= 20000;
          
          if (notLowerThanSpent && lowerThanUpperLimit) {
            state.Budget = action.payload;
          }
          
          return {
            ...state,
          };

        case 'CLEAR':
            state.departments.map((d) => {
                if (d.name === action.payload.name) {
                    d.allocation = 0;
                }
                new_departments.push(d);
                return true;
            });
            state.departments = new_departments;
            action.type = "DONE";
            return {
                ...state,
            };

        case 'INCR_BY_10':
            state.departments.map((d) => {
                if (d.name === action.payload.name && state.Remaining >= 10) {
                    d.allocation = d.allocation + 10;
                }
                new_departments.push(d);
                return true;
            });
            state.departments = new_departments;
            action.type = "DONE";
            return {
                ...state,
            };

        case 'DECR_BY_10':
            state.departments.map((d) => {
                if (d.name === action.payload.name) {
                    d.allocation = d.allocation - 10;
                }
                d.allocation = d.allocation < 0 ? 0 : d.allocation;
                new_departments.push(d);
                return true;
            });
            state.departments = new_departments;
            action.type = "DONE";
            return {
                ...state,
            };

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
  departments: [
    { id: "Marketing", name: "Marketing", allocation: 0 },
    { id: "Finance", name: "Finance", allocation: 0 },
    { id: "Sales", name: "Sales", allocation: 0 },
    { id: "Human Resource", name: "Human Resource", allocation: 0 },
    { id: "IT", name: "IT", allocation: 0 }
  ],
  Currency: "$",
  Budget: 2000,
  Remaining: 0,
  Spent: 0,
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    state.Spent = state.departments.reduce((total, item) => {
      return (total = total + item.allocation);
    }, 0);

    state.Remaining = state.Budget - state.Spent;

    return (
        <AppContext.Provider
            value={{
                departments: state.departments,
                Currency: state.Currency,
                Budget: state.Budget,
                Remaining: state.Remaining,
                Spent: state.Spent,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

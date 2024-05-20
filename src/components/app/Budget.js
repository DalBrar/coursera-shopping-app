import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Budget = () => {
  const {dispatch, Budget} = useContext(AppContext);

    const changeBudget = (val)=>{
            dispatch({
                type: 'CHANGE_BUDGET',
                payload: val,
            })
    }
    

  return (
    <div className='alert alert-secondary'>Budget: {
        <input
          required="required"
          type="number"
          id="budget"
          value={Budget}
          style={{ size: 10 }}
          onChange={(event) => changeBudget(event.target.value)}
        ></input>
      }	
    </div>
    );
};

export default Budget;
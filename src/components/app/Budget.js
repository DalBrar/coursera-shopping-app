import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Budget = () => {
  const {dispatch, Budget, Currency } = useContext(AppContext);

    const changeBudget = (val)=>{
            dispatch({
                type: 'CHANGE_BUDGET',
                payload: val,
            })
    }
    

  return (
    <div className='alert alert-secondary'>Budget: {Currency}{
        <input
          required="required"
          type="number"
          id="budget"
          step="10"
          max="20000"
          value={Budget}
          style={{ size: 10 }}
          onChange={(event) => changeBudget(event.target.value)}
        ></input>
      }	
    </div>
    );
};

export default Budget;
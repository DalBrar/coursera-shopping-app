import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Currency = () => {
  const {dispatch } = useContext(AppContext);

  const changeCurrency = (val)=>{
    dispatch({
        type: 'CHANGE_CURRENCY',
        payload: val,
    })
  }

  const optionStyle = {
    fontWeight: 'normal',
    color: 'black',
    backgroundColor: '#94E59A',
    width:'150px'
  };

  return (
    <div
      className='alert'
      style={{
        color:'white',
        backgroundColor:'#94E59A',
        fontWeight:'bold',
      }}
    >Currency ({
        <select
          name="Currency"
          id="Currency"
          onChange={event=>changeCurrency(event.target.value)}
          style={{
            border:'none',
            color:'white',
            fontWeight:'bold',
            backgroundColor: '#AABBCC00',
          }}
        >
          <option style={optionStyle} value="$">$ Dollar</option>
          <option style={optionStyle} value="£">£ Pound</option>
          <option style={optionStyle} value="€">€ Euro</option>
          <option style={optionStyle} value="₹">₹ Ruppee</option>
        </select>	
      })
    </div>
  );
};

export default Currency;
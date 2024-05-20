import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaMinusCircle, FaPlusCircle, FaTimesCircle } from 'react-icons/fa';

const ExpenseItem = (props) => {
    const { dispatch, Currency } = useContext(AppContext);

    const handleDeleteItem = () => {
        const item = {
            name: props.name,
        };

        dispatch({
            type: 'CLEAR',
            payload: item,
        });
    };

    const handleIncrease = () => {
        const item = {
            name: props.name,
        };

        dispatch({
            type: 'INCR_BY_10',
            payload: item,
        });
    };

    const handleDecrease = () => {
        const item = {
            name: props.name,
        };

        dispatch({
            type: 'DECR_BY_10',
            payload: item,
        });
    };


    return (
        <tr>
        <td>{props.name}</td>
        <td>{Currency}{parseInt(props.allocation)}</td>
        <td align="center"><FaPlusCircle size='2.2em' color="green" onClick={handleIncrease}></FaPlusCircle></td>
        <td align="center"><FaMinusCircle size='2.2em' color="darkred" onClick={handleDecrease}></FaMinusCircle></td>
        <td align="center"><FaTimesCircle size='1.25em' color="black" onClick={handleDeleteItem}></FaTimesCircle></td>
        </tr>
    );
};

export default ExpenseItem;
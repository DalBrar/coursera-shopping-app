import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Remaining = () => {
    const { Currency, Remaining } = useContext(AppContext);

    return (
        <div className='alert alert-success'>
            <span>Remaining: {Currency}{Remaining}</span>
        </div>
    );
};

export default Remaining;
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const SpentSoFar = () => {
    const { Currency, Spent } = useContext(AppContext);

    return (
        <div className='alert alert-primary'>
            <span>Spent so far: {Currency}{Spent}</span>
        </div>
    );
};

export default SpentSoFar;
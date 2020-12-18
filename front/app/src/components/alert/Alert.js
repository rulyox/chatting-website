import React from 'react';
import './Alert.css';

const Alert = ({ alert }) => {

    return (
        <div className="alert">
            {alert}
        </div>
    );

};

export default Alert;

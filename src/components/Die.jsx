import React from 'react';
export default function Die(props) {
    return (
        <div className={`dice-component ${props.isChecked ? 'bg-[#59e391]' : 'bg-white'}`} onClick={props.checkDice}>
            {props.value}
        </div>
    )
};

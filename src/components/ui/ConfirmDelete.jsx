import React from 'react';
import '../../style.css';

const ConfirmDelete = ({ onClose, removeTask }) => {
    return (
        <div className="overlay" onClick={onClose}>
            <div className="confirm-delete" onClick={(e) => e.stopPropagation()}>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this task?</p>
                <div className='delete-buttons'>
                    <button onClick={removeTask}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
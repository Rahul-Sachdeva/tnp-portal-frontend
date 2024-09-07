import React from 'react';
import '../styles/ConfirmationDialog.css'; // Import CSS for dialog styling

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog-content">
        <p>{message}</p>
        <div className="confirmation-dialog-buttons">
          <button onClick={onConfirm} className="dialog-button confirm-button">Yes</button>
          <button onClick={onCancel} className="dialog-button cancel-button">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

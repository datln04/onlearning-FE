import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';
const AccountModal = ({ isOpen, onClose, onSave, onUpdate, account }) => {
  const [editedAccount, setEditedAccount] = useState({
    name: '',
    description: '',
    minPrice: '',
    createDate: '',
    staffId: '',
    status: '',
  });

  useEffect(() => {
    if (account) {
      // Populate the form fields if a account is provided for editing
      setEditedAccount({
        name: account.name,
        description: account.description,
        minPrice: account.min_price,
        createDate: account.created_date,
        staffId: account.staff_id,
        status: account.status,
      });
    } else {
      // Clear the form fields if adding a new account
      setEditedAccount({
        name: '',
        description: '',
        minPrice: '',
        createDate: '',
        staffId: '',
        status: '',
      });
    }
  }, [account]);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedAccount({ ...editedAccount, [fieldName]: value });
  };

  const handleSave = () => {
    if (!editedAccount.name || !editedAccount.description) {
      // Show an error message or handle the validation as needed
      alert('Please fill in all required fields.');
      return;
    }

    if (account) {
      // If editing an existing account, call the onUpdate function
      onUpdate({ ...account, ...editedAccount });
      // add function api here
      alert(editedAccount.name);

      //-- end function update
    } else {
      // If adding a new account, call the onSave function
      onSave(editedAccount);
      // add function api here
      alert(editedAccount.name);
      //-- end function add new
      clearModal();
    }
  };

  const clearModal = () => {
    setEditedAccount({
      name: '',
      description: '',
      minPrice: '',
      createDate: '',
      staffId: '',
      status: '',
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{account ? 'Edit Account' : 'New Account'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Username"
          autoFocus
          margin="dense"
          name="name"
          value={editedAccount.username}
          onChange={(e) => handleInputChange(e, 'name')}
          required
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="First name"
          autoFocus
          margin="dense"
          name="description"
          value={editedAccount.firstName}
          onChange={(e) => handleInputChange(e, 'firstName')}
          required
        />
        <TextField
          fullWidth
          label="Last name"
          autoFocus
          margin="dense"
          name="min_price"
          value={editedAccount.lastName}
          onChange={(e) => handleInputChange(e, 'lastName')}
        />
        <TextField
          fullWidth
          label="Email"
          autoFocus
          margin="dense"
          name="staff_id"
          value={editedAccount.email}
          onChange={(e) => handleInputChange(e, 'email')}
          disabled={true}
        />
        <TextField
          fullWidth
          label="Role"
          autoFocus
          margin="dense"
          name="created_date"
          value={editedAccount.role}
          onChange={(e) => handleInputChange(e, 'role')}
          disabled={true}
        />
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          label="Status"
          name="asset"
          value={editedAccount.status}
          onChange={(e) => handleInputChange(e, 'status')}
          disabled={true}
        />
        {account?.status == 'enable' ? (
          <Button onClick={handleSave} color="danger">
            Disable account
          </Button>
        ) : (
          <Button onClick={handleSave} color="danger">
            Enable account
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountModal;

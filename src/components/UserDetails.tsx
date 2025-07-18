import React, { useState, FormEvent } from 'react';
import './UserDetails.css';
import API from './API-CALL';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';

interface CreateUserModalProps {
  onClose: () => void;
}

export default function CreateUserModal({ onClose }: CreateUserModalProps) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = { email, first_name, last_name, avatar };
    const response : any = await API('POST', 'add', newUser);

    if (response?.id) {
      alert('User added successfully!');
      dispatch(addUser(response));
      onClose();
    } else {
      alert('Failed to add user');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New User</h2>
          <button className="close-button" aria-label="Close" onClick={onClose}>&times;</button>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><span className="required">*</span>First Name</label>
            <input
              type="text"
              required
              placeholder="Enter first name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label><span className="required">*</span>Last Name</label>
            <input
              type="text"
              required
              placeholder="Enter last name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label><span className="required">*</span>Email</label>
            <input
              type="email"
              required
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label><span className="required">*</span>Profile Image Link</label>
            <input
              type="text"
              required
              placeholder="Enter avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button className="btn-cancel" type="button" onClick={onClose}>Cancel</button>
            <button className="default-btn" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

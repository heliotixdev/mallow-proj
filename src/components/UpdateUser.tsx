import React, { useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';

export default function UpdateUser() {
  const user : any = useSelector((state: RootState) => state.users.selectedUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState(user?.first_name || '');
  const [last_name, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  if (!user) return <div>No user selected for update.</div>;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser({ ...user, first_name, last_name, email, avatar }));
    alert('User updated!');
    navigate('/');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <span className="required">*</span>First Name
            </label>
            <input
              type="text"
              required
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>
              <span className="required">*</span>Last Name
            </label>
            <input
              type="text"
              required
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>
              <span className="required">*</span>Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>
              <span className="required">*</span>Profile Image Link
            </label>
            <input
              type="text"
              required
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button className="default-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

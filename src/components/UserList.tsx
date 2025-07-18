import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUsers, deleteUser } from '../redux/userSlice';
import { logout } from '../redux/authSlice';
import API from './API-CALL';
import CreateUserModal from './UserDetails';
import CardView from './CardUser';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import type { User } from '../redux/types';
import './UserList.css';

export default function UserList() {
  const users: any = useSelector((state: RootState) => state.users.users);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const response = await API('GET', 'userdetails', pageNumber);
      if (response && response.data) {
        dispatch(setUsers(response.data));
        setTotalPages(response.total_pages);
      }
    }

    fetchUsers(); // Always fetch when pageNumber changes
  }, [dispatch, pageNumber]);

  const handleEdit = (user: any) => {
    dispatch(selectUser(user));
    navigate('/update-user');
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;
    dispatch(deleteUser(id));
    alert('User deleted successfully!');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const filteredUsers = users.filter((user: User) => {
    if (search.length < 3) return true;
    const term = search.toLowerCase();
    return (
      user.email.toLowerCase().includes(term) ||
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term)
    );
  });

  return (
    <div className="user-list-container">
      <div className="header">
        <h2>Users</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="search-input"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className="default-btn" onClick={() => setShowModal(true)}>Create User</button>
          <button
            className="default-btn"
            onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
          >
            {viewMode === 'table' ? 'Card View' : 'Table View'}
          </button>
          <img
            src="/log-out.svg"
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
            alt="Logout"
          />
        </div>
      </div>

      {viewMode === 'table' ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: User) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avatar} alt={user.first_name} className="avatar" />
                  <span>{user.email}</span>
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="card-grid">
          {filteredUsers.map((user: User) => (
            <CardView
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showModal && <CreateUserModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

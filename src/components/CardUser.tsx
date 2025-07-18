import React from 'react';
import './UserCard.css';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface CardUserProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export default function CardUser({ user, onEdit, onDelete }: CardUserProps) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.first_name} className="card-avatar" />
      <h3>{user.first_name} {user.last_name}</h3>
      <p>{user.email}</p>
      <div className="card-actions">
        <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
}

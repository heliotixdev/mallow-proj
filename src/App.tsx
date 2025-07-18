import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserListPage from './pages/UserListPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UpdateUserPage from './pages/UpdateUserPage';
import { useSelector } from 'react-redux';
import { JSX, ReactNode } from 'react';
import { RootState } from './redux/store';

type PrivateRouteProps = {
  children: ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <PrivateRoute>
            <UserListPage />
          </PrivateRoute>
        } />
        <Route path="/user-details" element={
          <PrivateRoute>
            <UserDetailsPage onClose={function (): void {
              throw new Error('Function not implemented.');
            } } />
          </PrivateRoute>
        } />
        <Route path="/update-user" element={
          <PrivateRoute>
            <UpdateUserPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

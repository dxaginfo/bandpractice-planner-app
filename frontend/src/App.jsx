import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import BandsPage from './pages/bands/BandsPage';
import BandDetailsPage from './pages/bands/BandDetailsPage';
import CreateBandPage from './pages/bands/CreateBandPage';
import RehearsalsPage from './pages/rehearsals/RehearsalsPage';
import CreateRehearsalPage from './pages/rehearsals/CreateRehearsalPage';
import SetlistsPage from './pages/setlists/SetlistsPage';
import NotFoundPage from './pages/common/NotFoundPage';
import { checkAuth } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
      
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bands" element={<BandsPage />} />
          <Route path="/bands/create" element={<CreateBandPage />} />
          <Route path="/bands/:bandId" element={<BandDetailsPage />} />
          <Route path="/rehearsals" element={<RehearsalsPage />} />
          <Route path="/rehearsals/create" element={<CreateRehearsalPage />} />
          <Route path="/setlists" element={<SetlistsPage />} />
        </Route>
      </Route>
      
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
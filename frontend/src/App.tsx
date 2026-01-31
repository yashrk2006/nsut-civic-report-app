import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import DashboardPage from './pages/DashboardPage';
import ReportPage from './pages/ReportPage';
import GuidancePage from './pages/GuidancePage';
import MyComplaintsPage from './pages/MedicinesPage';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        <Router>
            <Toaster position="top-right" />
            <Routes>
                {/* Redirect root to home */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Main App Pages */}
                <Route path="/home" element={<DashboardPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/guidance" element={<GuidancePage />} />
                <Route path="/my-complaints" element={<MyComplaintsPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Backwards compatibility */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/health" element={<ReportPage />} />
                <Route path="/appointments" element={<GuidancePage />} />
                <Route path="/medicines" element={<MyComplaintsPage />} />
            </Routes>
        </Router>
    );
}

export default App;

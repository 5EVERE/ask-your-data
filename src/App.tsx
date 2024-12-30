import React, { useEffect, useState } from 'react';
import './App.css';

// Import components
import Header from './components/header/Header'; // Header Component
import Main from './components/main/Main'; // Main Chat Component
import Settings from './components/settings/Settings'; // Settings Component
import FooterStateData from './components/footer/FooterStateData'; // Footer Component
import AdaptationForm from './components/form/AdaptationForm'; // Adaptation Form Component
import Auth from './components/auth/Auth'; // Authentication Component

// Import routing tools from react-router-dom
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import SuperAdmin from './components/super-admin/SuperAdmin';
import EditUser from './components/super-admin/users/EditUser';

export interface Workspace {
  name: string;
  workspace_id: number;
}

function App() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]); // State for workspace list
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>(''); // State for selected workspace
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<
    number | undefined
  >(1);
  const location = useLocation(); // Get current location
  const isAuthPage = location.pathname === '/auth'; // Check if current path is '/auth'
  const navigate = useNavigate(); // Navigation function for programmatic redirection

  /**
   * Check if the user is authenticated by looking for the token in localStorage.
   * Redirect to '/auth' if no token is found.
   */
  useEffect(() => {
    const user = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!user) {
      navigate('/auth'); // Redirect to authentication page if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    const isSettingsOrSuperAdmin =
      location.pathname === '/settings' || location.pathname === '/super-admin';

    if (isSettingsOrSuperAdmin) {
      document.body.style.overflow = 'auto'; // Allow scrolling
    } else {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    }

    // Cleanup to reset the style when unmounting or changing routes
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, [location.pathname]);


  return (
    <div className="body-container">
      {/* Conditionally render the Header */}
      {!isAuthPage && (
        <Header
          workspaces={workspaces}
          setWorkspaces={setWorkspaces}
          selectedWorkspace={selectedWorkspace}
          setSelectedWorkspace={setSelectedWorkspace}
          selectedWorkspaceId={selectedWorkspaceId}
          setSelectedWorkspaceId={setSelectedWorkspaceId}
        />
      )}

      {/* Define Routes for the application */}
      <Routes>
        {/* Main Chat Page */}
        <Route
          path="/chat"
          element={
            <Main
              selectedWorkspace={selectedWorkspace}
              selectedWorkspaceId={selectedWorkspaceId}
            />
          }
        />

        {/* Settings Page */}
        <Route
          path="/settings"
          element={
            <Settings
              workspaces={workspaces}
              setWorkspaces={setWorkspaces}
              selectedWorkspace={selectedWorkspace}
              setSelectedWorkspace={setSelectedWorkspace}
              selectedWorkspaceId={selectedWorkspaceId}
              setSelectedWorkspaceId={setSelectedWorkspaceId}
            />
          }
        />
        <Route path="/super-admin" element={<SuperAdmin />}></Route>


        {/* Adaptation Form Page */}
        <Route path="/adaptation" element={<AdaptationForm />} />

        {/* Authentication Page */}
        <Route path="/auth" element={<Auth />} />

        {/* Redirect root path '/' to '/auth' */}
        <Route path="/" element={<Navigate to="/auth" />} />

        {/* Catch-All Route: Redirect any unknown paths to '/chat' */}
        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>

      {/* Render the Footer */}
      <FooterStateData />
    </div>
  );
}

export default App;

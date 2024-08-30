import { Routes,Route,Navigate } from "react-router-dom";
import Projects from "./pages/Projects"
import React from "react";
import My_Projects from "./pages/MyProjects";
import New_Project from "./pages/NewProject";
import Description from "./pages/Description";
import Spinner from "./components/Spinner";
import Settings from "./pages/Settings";
import NoteState from './context/notes/NoteState';
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    // Redirect to login page if there's no token
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <NoteState>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route path="/projects" element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        } />
        <Route path="/profile/:userid" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/my-projects" element={
          <ProtectedRoute>
            <My_Projects />
          </ProtectedRoute>
        } />
        <Route path="/new-project" element={
          <ProtectedRoute>
            <New_Project />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/project/:projectId" element={
          <ProtectedRoute>
            <Description />
          </ProtectedRoute>
        } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </NoteState>
  );
}

export default App;

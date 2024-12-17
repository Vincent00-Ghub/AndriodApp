import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LibraryHeader from "./components/LibraryHeader";
import LibraryForm from "./components/LibraryForm";
import FacultyLibraryForm from "./components/FacultyLibraryForm";
import VisitorLibraryForm from "./components/VisitorLibraryForm"; // Import VisitorLibraryForm
import ProfileInformation from "./components/ProfileInformation";
import LoggedIn from "./components/LoggedIn";
import UDMWelcome from "./components/UDMWelcome";
import BooksGrid from "./components/BooksGrid";
import LogoutPage from "./components/LogoutPage";

function App() {
  return (
    <Router basename="/react-app"> {/* Set basename if deploying in a subdirectory */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<LibraryHeader />} />
        
        {/* Library Forms */}
        <Route path="/library-form" element={<LibraryForm />} />
        <Route path="/faculty-library-form" element={<FacultyLibraryForm />} />
        <Route path="/visitor-library-form" element={<VisitorLibraryForm />} /> {/* New route for visitors */}
        
        {/* Profile Information */}
        <Route path="/profile" element={<ProfileInformation />} />
        
        {/* Logged-In Dashboard */}
        <Route path="/logged-in" element={<LoggedIn />} />
        <Route path="/dashboard" element={<UDMWelcome />} />
        
        {/* Books Grid */}
        <Route path="/books" element={<BooksGrid />} />
        
        {/* Logout Page */}
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;

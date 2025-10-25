import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from 'src/ui/Navbar/Navbar';
import HomePage from 'src/lib/landing/pages/HomePage';
import TeamPage from 'src/lib/landing/pages/TeamPage';
import SyllabusPage from 'src/lib/landing/pages/SyllabusPage/SyllabusPage';
import { SignInPage, SignUpPage } from 'src/lib/auth/pages';
import { Footer } from 'src/lib/landing/components';
import { AuthContextProvider } from '../auth/authContext';
import ProtectedRoute from 'src/utils/protectedRoutes';
import SortRegistrationPage from './pages/SortRegistrationPage/SortRegistrationPage'

const LandingRouter = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          {/* an example of how to use the protected route */}
          {/* <Route path="/team" element={<ProtectedRoute><TeamPage /> </ProtectedRoute>} /> */}
          <Route path="/team" element={<TeamPage />} />
          <Route path="/syllabus" element={<ProtectedRoute><SyllabusPage /></ProtectedRoute>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/assessment-day" element={<SortRegistrationPage />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
};


export default LandingRouter;

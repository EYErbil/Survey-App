// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import UserSurveys from './components/UserSurveys';
import CreateSurvey from './components/CreateSurvey';
import SurveyDetailPage from './components/SurveyDetailPage';
import ResultPage from './components/ResultPage';
import AddQuestion from './components/AddQuestion';
import './globalStyles.css';
import RegisterPage from './components/RegisterPage';
import SurveyEditPage from './components/SurveyEditPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007bff',
    },
    background: {
      default: '#1e1e1e',
      paper: '#282828',
    },
    text: {
      primary: '#f5f5f5',
    },
  },
});

function App() {
  const [username, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  

  const handleLogin = (username, userId) => {
    setUser( username );
    setIsAdmin(true);
    setUserId(userId);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Header username={username} isAdmin={isAdmin} />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
              {isAdmin && <Route path="/create-survey" element={<CreateSurvey username={username} />} />}
              {isAdmin && <Route path="/user-surveys" element={<UserSurveys userId={userId} username={username}/>} />}
              {isAdmin && <Route path="/result-survey/:surveyId" element={<ResultPage />} />}
              {isAdmin && <Route path="/edit-survey/:surveyId" element={<SurveyEditPage userId={userId} />} />}
              <Route path="/survey/:surveyId" element={<SurveyDetailPage username={username} isAdmin={isAdmin}  userId={userId}/>} />
              {isAdmin && <Route path="/add-question/:surveyId" element={<AddQuestion />} />}
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

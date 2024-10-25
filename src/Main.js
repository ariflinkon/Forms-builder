import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './Components/Home';
import EditForm from './Components/Form/EditForm';
import Login from './Components/Login';
import PrivateRoute from './Components/util/PrivateRoute';
import UserView from './Components/Responding/UserView';
import RadioCheck from './Components/Responding/RadioCheck';

function Main() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/form/:formId" element={<PrivateRoute><EditForm /></PrivateRoute>} />
          <Route exact path="/s/:formId" element={<UserView />} />
          <Route exact path="/gooo" element={<RadioCheck />} />
        </Routes>
      </Router>
    </div>
  );
}


export default Main;
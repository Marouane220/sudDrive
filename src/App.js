import './App.css';
import Signup from './components/authentication/Signup';
import Profile from './components/authentication/Profile';
import Login from './components/authentication/Login'
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './components/authentication/PrivateRoute';
import ForgotPassword from './components/authentication/ForgotPassword';
import UpdateProfile from './components/authentication/UpdateProfile';
import Dashboard from './components/sud-drive/Dashboard';
import Acceuil from './components/Acceuil/acceuil';





function App() {
  return (
    <Router>
      <Route exact path='/' component={Acceuil} />
      <AuthProvider>
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/folder/:folderId' component={Dashboard} />

        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/update-profile' component={UpdateProfile} />

        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/forgot-password' component={ForgotPassword} />
      </AuthProvider>  
    </Router>
  );
}

export default App;

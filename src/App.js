
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Contractorpage from './Components/ContractorComponents/Contractorpage';
import LicensnoForm from './Components/ContractorComponents/minIcomponents/EnterLicenseNO';

import { Home } from './Components/Home';
import Labourpage from './Components/LabourComponents/Labourpage';
import { Login } from './Components/UserComponents/login components/loginForm';
import Logout from './Components/UserComponents/Logout';
import Register from './Components/UserComponents/registration comopnents/RegistrationForm';
import Userpage from './Components/UserComponents/Userpage';

function App() {

  return (
    <BrowserRouter>

      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/register" component={Register} />
      <Route exact={true} path="/user" component={Userpage} />
      <Route exact={true} path="/contractor" component={Contractorpage} />
      <Route exact={true} path="/labour" component={Labourpage} />

      <Route exact={true} path="/dummy" component={Register} />
      <Route exact={true} path="/logout" component={Logout} />
      <Route exact={true} path="/contractor/addLicenseNo" component={LicensnoForm} />
    </BrowserRouter>

  );
}

export default App;

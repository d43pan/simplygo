import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import {AuthenticationGuard}  from './components/AuthenticationGuard';
import GoPath from './components/GoPath';
import GoHome from './components/GoHome';
import FailoverPage from './components/FailoverPage';
import Account from './components/Account';
import Login from './components/SendToLogin';
import Header from './components/Header';
import Footer from './components/Footer';
import CallbackPage from './components/CallbackPage';
import './index.css';
import { LoggerContext, logger } from './components/LoggerContext';


function App() {
  return (

    <LoggerContext.Provider value={logger} >

    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow justify-center items-center">
      <Routes >
        <Route path="/" element={< IndexPage />} />
       {/* <Route path="/go/:path/:pathAction" component={GoPathAction} /> */} 
        <Route path="/go" element={< GoHome />} />
        <Route path="/go/:path" element={< GoPath />} />
        <Route path="/u/account" 
          element={<AuthenticationGuard component={Account} />}  />
        <Route path="/login" element={< Login /> } />
        {/*<Route path="/u/:user/" element={ <UserPath />} /> */}
         
       {/* <Route path="/o/:org/:orgAction" component={OrgAction} /> */} 
        {/* <Route path="/a/:appPath" component={AppPath} /> */} 
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/:failover" element={< FailoverPage />}  />
      </Routes>
      </div>
      <Footer />
      </div> {/* tailwind wrapper*/}

    </LoggerContext.Provider>
  );
}

export default App;
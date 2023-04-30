import './style.css'
import Home from './pages/User/Home'
import HomeTrainer from './pages/trainer/Home'
import Calendar from './pages/User/Calendar'
import Login from './pages/User/Login'
import Registration from './pages/User/Registration'
import Navbar from './components/navbar/Navbar'
import Profile from './pages/sports/Profile'

function App() {
  return (
    <div className='app'>
      {/* <Home /> */}
      {/* <Calendar/> */}
      {/* <Login /> */}
      {/* <Registration /> */}
      {/* <HomeTrainer/> */}
      {/* <Navbar/> */}
      <Profile/>
    </div>
      
    );
}

export default App;

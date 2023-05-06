import './style.css'
import Home from './pages/User/Home'
import HomeTrainer from './pages/trainer/Home'
import Calendar from './pages/User/Calendar'
import Login from './pages/User/Login'
import Registration from './pages/User/Registration'
import Navbar from './components/navbar/Navbar'
import Profile from './pages/sports/Profile'
import { Route, Routes } from 'react-router-dom'
import CompetitionId from './components/competition/CompetitionId'
import Competition from './pages/sports/Competition'
import CompetitionTrainer from './pages/trainer/Competition'
import CompetitionRegistration from './pages/sports/CompetitionRegistration'
import CompetitionRegistrationTrainer from './pages/trainer/CompetitionRegistration'

function App() {
  return (
    <div className='app'>
      <Routes>
      
        <Route exac path='/' element={<Home/>}/>
        <Route exac path='/competition' element={<Calendar/>}/>
        <Route exac path='/login' element={<Login/>}/>
        <Route exac path='/registration' element={<Registration/>}/>
        {/* <Route exac path='/competition/competitionId' element={<Competition/>}/> */}
        <Route exac path='/competition/competitionId' element={<CompetitionTrainer/>}/>
        {/* <Route exac path='competition/competitionId/registration' element={<CompetitionRegistration />}/> */}
        <Route exac path='competition/competitionId/registration' element={<CompetitionRegistration />}/>
        <Route exac path='competition/competitionId/registrationGroup' element={<CompetitionRegistrationTrainer />}/>
        <Route exac path='/profile' element={<Profile/>}/>

      </Routes>
        
      
      {/* <Home /> */}
      {/* <Calendar/> */}
      {/* <Login /> */}
      {/* <Registration /> */}
      {/* <HomeTrainer/> */}
      {/* <Navbar/> */}
      {/* <Profile/> */}
    </div>
      
    );
}

export default App;

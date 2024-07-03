import './style.css'
import Home from './pages/User/Home'
import Calendar from './pages/User/Calendar'
import Login from './pages/User/Login'
import Registration from './pages/User/Registration'
import Profile from './pages/sports/Profile'
import { Route, Routes } from 'react-router-dom'
import Competition from './pages/sports/Competition'
import CompetitionRegistration from './pages/sports/CompetitionRegistration'
import ListSportsman from './pages/administrator/ListSportsman'
import { useContext } from 'react'
import { CustomContext, SportContext } from './utils/Context'
import MyCompetition from './pages/sports/MyCompetition'
import CreateCompetition from './pages/administrator/CreateCompetition'
import CreateSportsman from './pages/administrator/CreateSportsman'
import ArticlePage from "./components/news/ArticlePage";
import ArticleList from "./pages/User/ArticleList";
import AboutFederation from "./pages/User/AboutFederation";
function App() {

  const {user, setUser} = useContext(CustomContext)
  const {sport, setSports} = useContext(SportContext)

  function profile(role){
    if(role == 'ADMIN'){
      return <Profile user={sport}/>
    } else {
      return <Profile user={user}/>
    }
  }


  return (
    <div className='app'>
      <Routes>
        <Route exac path='/' element={<Home/>}/>
        <Route exac path='/aboutFederation' element={<AboutFederation/>}/>
        <Route exac path='/article/:articleId' element={<ArticlePage/>}/>
        <Route exac path='/articleList' element={<ArticleList/>}/>
        <Route exac path='/competition' element={<Calendar/>}/>
        <Route exac path='/login' element={<Login/>}/>
        <Route exac path='/registration' element={<Registration/>}/>
        <Route exac path='/competition/:competitionId' element={<Competition/>}/>
        <Route exac path='/registrationSports/:competitionId' element={<CompetitionRegistration />}/>
        <Route exac path='/profile' element={profile(user.role)}/>
        <Route exac path='/profileSportsTrainer' element={<Profile user={sport} btnStatus={'none'}/>}/>
        <Route exac path='/sports' element={<ListSportsman urls={'http://localhost:8080/api/v1/admin/sportsmen'} role={'sports'}/>}/>
        <Route exac path='/coaches' element={<ListSportsman urls={'http://localhost:8080/api/v1/admin/coaches'} role={'coaches'}/>}/>
        <Route exac path='/myCompetition' element={<MyCompetition />}/>
        <Route exac path='/createCompetition' element={<CreateCompetition/>}/>
        <Route exac path='/createSports' element={<CreateSportsman/>}/>
      </Routes>
    </div> 
  );
}

export default App;
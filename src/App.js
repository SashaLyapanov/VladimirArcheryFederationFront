import './style.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Calendar from './pages/Calendar'

function App() {
  return (
    <div className='app'>
      <Navbar/>
      {/* <Home /> */}
      <Calendar/>
    </div>
      
    );
}

export default App;

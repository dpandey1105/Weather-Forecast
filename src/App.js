import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Components
import HomePage from "./Components/HomePage/HomePage"
import Weather from './Components/Weather/Weather';




function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route  path='/'  element={<HomePage />}/>
          <Route  path='/weather-forecast'  element={<Weather />}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;

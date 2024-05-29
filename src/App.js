import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Components
import HomePage from "./Components/HomePage/HomePage"
import Weather from './Components/Weather/Weather';




function App() {
  return (
    <BrowserRouter basename='weather-forecast'>
      <div>
        <Routes>
          <Route  path='/'  element={<HomePage />}/>
          <Route  path='/api/weather'  element={<Weather />}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;

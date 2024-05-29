import './App.css';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
//Components
import HomePage from "./Components/HomePage/HomePage"
import Weather from './Components/Weather/Weather';




function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route  path='/'  element={<HomePage />}/>
          <Route  path='/api/weather'  element={<Weather />}/>
        </Routes>

      </div>
    </HashRouter>
  );
}

export default App;

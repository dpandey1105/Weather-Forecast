import React, { useState, useEffect } from "react";
import suncloud from "../../Assets/Images/sunnycloud.gif"
import raincloud from '../../Assets/Images/rainycloud.gif';
import secondimg from '../../Assets/Images/img-bg.png';
import SearchIcon from '@mui/icons-material/Search';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chip from '@mui/material/Chip';
import { pink,indigo, blue,red,orange,green } from '@mui/material/colors';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';


const Weather = () => {
  const navigate = useNavigate();//navigating between pages in your React application. 
  const [data, setData] = useState(null); //data and set data is the usestate hooks where data is used for fetch the api data set data is used to update
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
 


  const handleNavigate = () => {
    navigate('/')
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {   //useEffect is used for side effect to take the side effect of API
    const fetchApi = async () => {  //instead of promises we have used here async and await and after that we have tried try and catch for error
      if (searchText) {
        try {
          setError(false);
          setLoading(true); //here in get API we have used search text that after searching on input in will response
          const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=1aa32891da9a48a499a162121242205&q=${searchText}&aqi=no`);
          if (response.status === 200) {
            setLoading(false);
            setData(response.data);
          }

        } catch (error) {
          setError(true)
          console.error("Error fetching the weather data", error);
        }
      }
    };

    const debounceTimeout = setTimeout(fetchApi,1000); //for multiple api rendering in networks we have used debounce with settimeout 1000 that after clicking aft erevery 1 sec it will reload
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchText]);



  return (
    <div>
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-cover bg-center h-screen" style={{ backgroundImage: `url(${secondimg})` }}>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-gray-200 shadow-2xl sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-20 border-black backdrop-blur[20px]">
            <div className="max-w-md mx-auto">
              <div>
                
                <h1 className="h-[7rem] sm:h-24 sm:text-[2rem] flex justify-center items-center font-bold text-[1.6rem] transition duration-300 hover:scale-105  hover:sm:text-[2.1rem] -mt-16">Weather
                  <div className="relative inline-block ml-2">
                    <img src={suncloud} className="w-9 h-9 sm:w-12 sm:h-12 transition-opacity duration-300 opacity-100 hover:opacity-0" />
                    <img className="w-9 h-9 sm:w-12 sm:h-12 absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100" src={raincloud} />
                  </div>Forecast
                </h1>
                
                <div className="bg-gray-100 py-2 px-4 flex items-center mx-auto rounded-lg shadow-md mb-4 relative overflow-hidden">
                  <input
                    className="flex-1 bg-transparent outline-none"
                    type="text"
                    placeholder="Search Location"
                    aria-label="search city name"
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                  <button className="px-3 py-1 bg-[#0073BB] text-white rounded-full" aria-label="search">
                    <SearchIcon />
                  </button>
                </div>

                <div className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden">

                {loading && ( //loading is used for CircularProgress or loading to display on the screen when api call take time 
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-90">
                      <CircularProgress />
                    </div>)}
                  {error ? (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-40 text-white font-bold">
                      <span>Ooops.. data not found! <FmdBadIcon /></span>
                    </div>
                  ) : (
                    data && searchText ? (
                      <div className="p-4">
                        <h1 className="text-lg mb-4 text-[#0073BB] justify-center flex items-center"><span className="text-black font-bold text-xl px-1">Region:</span>{data.location.region}</h1>
                        <h1 className="text-2xl font-bold mb-4 text-[#0073BB]  justify-center flex items-center">Weather in {data.location.name} <Typography sx={{ mt: 1, ml: 1, fontSize: 12, color: 'text.secondary' }} variant="subtitle1"> | {data.location.localtime}</Typography> </h1>
                        <div className="mb-4 bg-blue-200">
                          <img src={data.current.condition.icon} alt={data.current.condition.text} className="w-20 h-20 mx-auto" />
                        </div>

                        <div className="flex gap-2 justify-center">
                          <div className="w-1/2 gap-3 flex flex-col">
                  
                            <Tooltip className="text-base font-bold" placement="left-start" title={data.current.temp_c > 25 ? "Too Hot 🥵" : "Room Temperature 😌"}>
                            <Chip sx={{ color: data.current.temp_c > 25 ? red[900] : blue[800] }} icon={<DeviceThermostatIcon />} label={`${data.current.temp_c} °C`}/>
                          </Tooltip>


                            <h1 className="text-base font-bold flex flex-col"><Chip icon={<ThunderstormOutlinedIcon />} label={data.current.condition.text} /></h1>

                          </div>

                          <div className="w-1/2 gap-3 flex-col flex">

                          <Tooltip className="text-base font-bold" placement="right-start" title={ //here we have used tooltip with condition in it
                            data.current.humidity < 30 ? "Low humidity level 🌵" :
                            data.current.humidity < 60 ? "Moderate humidity level 💧" :
                            "High humidity level 🌧️"
                          }>
                            <Chip sx={{ color: data.current.humidity < 30 ? pink[700] : data.current.humidity < 60 ? indigo[400] : blue[800] }} icon={<OpacityOutlinedIcon />} label={`${data.current.humidity} %`} />
                           </Tooltip> {/*we have also used chip with icon chip is a tool used to enter information, make selections, filter content, or trigger actions. */}


                          <Tooltip className="text-base font-bold " placement="right-start" title={
                            data.current.wind_kph < 19 ? "Fresh Breeze🍃" :
                            data.current.wind_kph < 49 ? "Strong Breeze 🍃 ༄" :
                            data.current.wind_kph < 75 ? "High gale ༄｡° " :
                            data.current.wind_kph < 117 ? "Violent storm 𓇢𓆸 " :
                            "Hurricane 🌪"
                          }>
                            <Chip sx={{ color: data.current.wind_kph < 19 ? orange[500] : data.current.wind_kph < 49 ? orange[800] : data.current.wind_kph < 75 ? orange : data.current.wind_kph < 117 ? orange[900] : green[900] }} icon={<AirOutlinedIcon />} label={`${data.current.wind_kph} Kph`} />
                          </Tooltip> {/*sx is a props used for desigining custom css such as color,fontsize,ternery operator condition  */}

                          </div>
                        </div>
                      </div>
                    ) : (
                      !searchText ? (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-40 text-white font-bold">
                          <p>Type the city name to continue...</p>
                        </div>
                      ) : null
                    )
                  )}
                </div>
                 {/* error valid  enter city name in red color below input search text */}
                {error && searchText ? <strong style={{color: 'red'}}> Please enter a valid city name</strong> : ""}
                

                <div className="flex items-start justify-start mt-10">
                  <Button
                    variant="contained"
                    onClick={handleNavigate}>
                    Back
                  </Button>
                </div>      
              </div>
            </div>
          </div>
        </div>
      </div>c
    </div>
    
  )
}

export default Weather;
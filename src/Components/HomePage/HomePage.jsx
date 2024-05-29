import suncloud from "../../Assets/Images/sunnycloud.gif"
import raincloud from '../../Assets/Images/rainycloud.gif';
import { Button } from "@mui/material";
import firstimg from "../../Assets/Images/page-bg.png";


const HomePage = () => {

    const handleClick = () => {
        window.location.href = "/weather-forecast-app/weather-forecast"
    }

    return (
<div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-cover bg-center h-screen" style={{backgroundImage:`url(${firstimg})`}}>
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="relative px-4 py-10 bg-gray-200 shadow-2xl sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-20 border-black backdrop-blur[20px]">
      <div className="max-w-md mx-auto">
        <div>

          <h className="h-[7rem] sm:h-24 sm:text-[2rem] flex justify-center items-center font-bold text-[1.6rem] transition duration-300 hover:scale-105  hover:sm:text-[2.1rem] -mt-10">Weather 
          <div className="relative inline-block ml-2">
          <img src={suncloud} className="w-9 h-9 sm:w-12 sm:h-12 transition-opacity duration-300 opacity-100 hover:opacity-0"/>
          <img className="w-9 h-9 sm:w-12 sm:h-12 absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100" src={raincloud}/>
          </div>Forecast
          </h>
      
            <Button 
            variant="contained"
            onClick={handleClick}
            className='w-[100%] h-50vh'>
                Try Weather Forecast now!
            </Button>
      
        </div>
        </div>
      </div>
    </div>
  </div>
    )

}

export default HomePage;
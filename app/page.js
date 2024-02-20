"use client"
import '@/app/font-css/ico/wet-ico.css'
import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'


const HomePage = () => {
  const callApi = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&units=metric&appid=934bda249369880d33a9481b80876162`
      let res = await axios.get(url)
      const { temp, humidity, pressure } = res.data.main;
      const { main: weatherCondition } = res.data.weather[0];
      const { name: city } = res.data;
      const { country } = res.data.sys;
      const allInfo = {
        temp, 
        humidity, 
        pressure, 
        weatherCondition, 
        city, 
        country
      }
      setWeather(allInfo)

    } catch (error) {
      alert(Location + " " + "not Found !!")
    }
  }
  // calling location fst auto 
  useEffect(() => {
    callApi()

  }, []);

  // all states 
  const [Location, setLocation] = useState("New York")
  const [Weather, setWeather] = useState({})
  const [Time, setTime] = useState("")

  //getting time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getUTCHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds())
    }, 1000);
  }, [])


  return (
    <>
      <div className="main">
        <div className="search">
          <input className="bg-gray-50 border p-4 text-xl text-center font-bold border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            type="text"
            name="Search"
            value={Location}
            placeholder='Search'
            onChange={(event) => {
              setLocation(event.target.value)
            }
            } />
          <button type="submit" className="btn1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-24 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => callApi()}>Search</button>
        </div>

        <div className="weather-details">
          <div className="top-icon bg-gray-700"><i className={"wi wi-cloudy"}></i></div>

          <div className="weather-value flex">
            <div className="right">

              <div className="right-v">
                <div className="val flex">
                  <h1 className='text-8xl'>{Math.round(Weather.temp)}</h1><span className='text-6xl'>&deg;</span>
                </div>

                <h2 className='text-4xl'>{Weather.city},{Weather.country}</h2></div>
            </div>

            <div className="left">
              <h2 className='text-4xl font-bold pt-4'>{Weather.weatherCondition}</h2>
              <h1 className='font-bold'>Time:</h1>
              <span>{Time}</span>
            </div>
          </div>
          <div className="b-items justify-between p-4 pb-8">
              <div className="item flex align-middle text-center justify-center">
                <i className={"wi wi-strong-wind p-2 text-4xl"}></i>
                <div className='flex font-bold flex-col'>Speed<span>{Weather.pressure}</span></div>
              </div>
              <div className="item flex align-middle text-center justify-center">
                <i className={"wi wi-humidity p-2 text-4xl"}></i>
                <div className='flex font-bold flex-col'>Humidity<span>{Weather.humidity}</span></div>
              </div>
              <div className="item flex align-middle text-center justify-center">
                <i className={"wi wi-cloudy p-2 text-4xl"}></i>
                <div className='flex font-bold flex-col'>Condition<span>{Weather.weatherCondition}</span></div>
              </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default HomePage;

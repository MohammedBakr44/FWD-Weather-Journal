
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const generate = document.querySelector("#generate");

/* Date object */
const d = new Date();
/* HTML display elements */
const displayDate = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
const container = document.querySelector(".container");
/* API */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const appId = "e429a53892e8ed57eeb77a96d5daa767";

/* Fetching the data */

const getWeather = async(url = '', zip='', id='') => {
 const req = fetch(`${url}zip=${zip}&appid=${id}&units=metric`);
  try {
    const data = (await req).json();
    return data;
  } catch(error) {
    console.log("error: ", error);
  }
}

/* POST request to send weather data*/

const addWeather = async(url='', data='') => {
  const rs = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  try {
    const newData = await rs.json();
    console.log(newData);
    return newData;
  } catch(error) {
    console.log(`error: ${error}`);
  }
}

 // Updating the UI 
const updateUi = async()=> {
   const rq = await fetch('/all'); // Requesting the route all
  try {
    const allData = await rq.json();
      temp.innerHTML = `${Math.round(allData.temp)} degrees`; // getting the temperature from the data object returned from the API
      content.innerHTML = `${allData.feelings}`; // Set the feelings according to the textarea #feelings
      displayDate.innerHTML = `${allData.displayDate}`; // Getting today's data using Date object instance
  } catch(error) {
    console.log(`error: ${error}`);
  }
} 


const clickHandler = e => {
  e.preventDefault(); // Preventing the page from reloading when clicking on the button
  const nowDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  getWeather(baseUrl, zip.value, appId)
    .then(data => {

      addWeather(
        '/weather', 
        {
          temp: data.main.temp,
          displayDate: nowDate ,
          feelings: feelings.value
        })
    }).then(() => {
      updateUi();
    });
  // Changing background according to feelings value
  feelings.value.toLowerCase() == 'hot' ? 
    container.style.backgroundImage = `url('./assests/hot.jpg')` :
    container.style.backgroundImage = `url(./assests/winter.jpg)`;
}

/* Events */
generate.addEventListener('click', clickHandler);

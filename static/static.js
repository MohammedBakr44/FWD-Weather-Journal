const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const generate = document.querySelector("#generate");

/* Date object */
const d = new Date();
/* HTML display elements */
const displayDate = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");

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

  
const clickHandler = e => {
  e.preventDefault();
  getWeather(baseUrl, zip.value, appId)
    .then(data => {
      temp.innerHTML = `Temperature: ${data.main.temp}`;
      displayDate.innerHTML = `${d.getDay()}.${d.getMonth() + 1}.${d.getFullYear()}`;
      content.innerHTML = feelings.value;
    })
}


/* Events */
generate.addEventListener('click', clickHandler);

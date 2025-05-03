//DOMS
const serchBtn = document.getElementById("search-btn");
const userInput = document.getElementById("ip-input");

const ipAddress = document.getElementById("ip-address");
const ipLocation = document.getElementById("location");
const ipISP = document.getElementById("isp");
const timeZone = document.getElementById("timezone");
const mapInfo = document.getElementById("map");


//handlers
serchBtn.addEventListener("click", ()=>{
  const ipValue = userInput.value;
  trackIp(ipValue);
  mapData().getMap(ipValue);
  userInput.value = "";
})

//functiojns
function displayData(ipData){
  ipAddress.innerHTML = ipData.query;
  ipLocation.innerHTML = ipData.country + ", " + ipData.regionName +", " + ipData.city;
  ipISP.innerHTML = ipData.isp;
  timeZone.innerHTML = ipData.timezone;
}

async function trackIp(ip){
  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await response.json();

  try {
    if(!response.status){
      throw new Error("Input ip address!")
    }
    displayData(data);

  } catch (error) {
    alert(error.message);
  }
}

function mapData(){
  return {
    getMap : (ip) => {
      fetch(`http://ip-api.com/json/${ip}`)
        .then(res => res.json())
          .then(data => {
            showMap(data.lat , data.lon);
          })
    }
  }
}


// map handler 
let map;
function showMap(lat, lon){

  if(!map){
    map = L.map('map').setView([lat, lon], 13);
    L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
      attribution: `&copy; OpenStreetMap contributors`
    }).addTo(map);
  }else{
    map.setView([lat, lon], 13);
  }

  L.marker([lat, lon]).addTo(map)
    .bindPopup('IP LOCATION HERE')
      .openPopup();
}


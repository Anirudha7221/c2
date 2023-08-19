let URL_ip="https://api.ipify.org?format=json";   

$.getJSON(URL_ip, function(data){
    $("#IP-address").text(data.ip);
});

const first_page=document.getElementById("before-clicking");

const second_page=document.getElementById("after-clicking");

let click_btn=document.getElementById("start-btn");
click_btn.addEventListener("click",()=>{
    console.log("clicked");
    first_page.style.display="none";
    second_page.style.display="block";
    displayInfo();
})

async function displayInfo(){
    
    const IP=document.getElementById("IP-address").innerText;

    let api="2c2258816d21f8";

    const Map_url=`https://ipinfo.io/${IP}/geo?token=${api}`;

    const response=await fetch(Map_url,{method:"GET"});

    const results=await response.json();

    console.log(results);

    let lat=results.loc.split(",")[0];
    let long=results.loc.split(",")[1];

    var date=new Date;

    const getTime=date.toLocaleString(`en-${results.country}`,{timeZone: `${results.timezone}`});

    const office_url=`https://api.postalpincode.in/pincode/${results.postal}`;

    const response2=await fetch(office_url,{method:"GET"});

    const results2=await response2.json();

    console.log(results2);

    // console.log(getTime);

   let newDiv=document.createElement("div");
   newDiv.innerHTML=`<p id="para">IP Address: <span class="answers"">${IP}</span></p>
   <div id="location-info">
       <div>Lat: <span class="answers">${lat}</span></div>
       <div>City: <span class="answers">${results.city}</span></div>
       <div>Organization: <span class="answers">${results.org}</span></div>
       <div>Long: <span class="answers">${long}</span></div>
       <div>Region: <span class="answers">${results.region}</span></div>
       <div>Hostname: <span class="answers"></span></div>
    </div>
    <div id="map">
       <h1>Your Current location</h1>
       <iframe id=location src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed" frameborder="0"></iframe>
    </div>
    <div id="More-info">
       <h1>More Information About You</h1>
       <p>Time Zone: <span class="answers">${results.timezone}</span></p>
       <p>Date And Time: <span class="answers">${getTime}</span></p>
       <p>Pincode: <span class="answers">${results.postal}</span></p>
       <p>Messages: <span class="answers">${results2[0].Message}</span></p>
    </div>
    <div id="Postoffice-info">
       <h1>Post Offices Near You</h1>
       <div id="search">
           <i class="fa-solid fa-magnifying-glass"></i>
           <input type="text" id="search-bar" placeholder="Search By Name">
       </div>
    </div>`;
    second_page.appendChild(newDiv);

    let post_offices=document.getElementById("post-offices");
    
    results2.forEach(element => {
        let post_card=document.createElement("div");
        post_card.className="card";

        post_card.innerHTML=`<div>${results2.PostOffice[element].name}</div>
                        <div>${results2.PostOffice[element].BranchType}</div>
                        <div>Delivery Status</span>${results2.PostOffice[element].DeliveryStatus}</div>
                        <div>${results2.PostOffice[element].District}</div>
                        <div>${results2.PostOffice[element].Division}</div>`
        post_offices.appendChild(post_card);
    });

    second_page.appendChild(post_offices);
}

// <id=location iframe src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed"></iframe>
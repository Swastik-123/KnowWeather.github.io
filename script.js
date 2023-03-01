
/* <li class="city">
<h2 class="city-name" data-name="...">
  <span>...</span>
  <sup>...</sup>
</h2>
<span class="city-temp">...<sup>°C</sup></span>
<figure>
  <img class="city-icon" src="..." alt="...">
  <figcaption>...</figcaption>
</figure>
</li> */



// cloud_pct: 20
// feels_like: 25
// humidity: 47
// max_temp: 25
// min_temp: 25
// sunrise: 1677374408
// sunset: 1677415709
// temp: 25
// wind_degrees: 60
// wind_speed: 2.06

const form = document.querySelector(".top-banner form");
const list = document.querySelector(".ajax-section .cities");
const inp = document.getElementById("inp");
const msg = document.querySelector(".top-banner .msg")

const li = document.createElement("li");
li.classList.add("city");

form.addEventListener("submit",e=>{
	e.preventDefault();
	// const inputval = input.value;
	
	let inputval = inp.value;

	const listItems = list.querySelectorAll(".ajax-section .city");
	const listItemsArray = Array.from(listItems);
	if(listItemsArray.length > 0){
		const filteredArray = listItemsArray.filter(el => {
			let content = "";
			//athens,gr
			if (inputval.includes(",")) {
			  //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
			  if (inputval.split(",")[1].length > 2) {
				inputval = inputval.split(",")[0];
				content = el
				  .querySelector(".city-name span")
				  .textContent.toLowerCase();
			  } else {
				content = el.querySelector(".city-name").dataset.name.toLowerCase();
			  }
			} else {
			  //athens
			  content = el.querySelector(".city-name span").textContent.toLowerCase();
			}
			return content == inputval.toLowerCase();
		  });
		  if (filteredArray.length > 0) {
			msg.textContent = `You already know the weather for ${
			  filteredArray[0].querySelector(".city-name span").textContent
			} ...otherwise be more specific by providing the country code as well 😉`;
			form.reset();
			input.focus();
			return;
		  }
	}



	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '32314c37f7mshf2182a42a2116a7p15c05ajsne7b3730201b5',
			'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
		}
	};
	
	fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${inputval}`, options)
		.then(response => response.json())
		.then(response => {
			console.log(response);
			
			if(response["temp"] != null){
			const markup = `
				<h2 class="city-name" data-name=${inputval}>
					<span>${inputval}</span>
					<sup>...</sup>
				</h2>
				<span class="city-temp">${Math.round(response["temp"])}<sup>°C</sup></span>
				<figure>
					<img class="city-icon" src="..." alt="...">
					<figcaption>...</figcaption>
				</figure>
				`
				li.innerHTML = markup;
				list.appendChild(li);
			}else{
				msg.textContent = "Please search a valid city 😩"
			}
			

	})
	.catch(()=>{
		// msg.textContent = "Search a valid city 😩"
	});
	msg.textContent = "";
	form.reset();
	input.focus();
})


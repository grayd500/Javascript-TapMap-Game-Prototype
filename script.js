// These lines link HTML elements and stores them a variable.
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

// This function gets info from the URL.
function getParams() {
  var searchParamsArr = document.location.search.split('&');

  if (searchParamsArr[0] && searchParamsArr[1]) {
    var query = searchParamsArr[0].split('=').pop();
    var format = searchParamsArr[1].split('=').pop();
    searchApi(query, format);
  }
}

function printResults(brewery) {
  // Make a new box to put the brewery info in
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  // Make another box inside the first one
  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  // Show the brewery's name as the title
  var titleEl = document.createElement('h3');
  titleEl.textContent = brewery.name;
  resultBody.append(titleEl);

  // Show the brewery's type
  var typeEl = document.createElement('p');
  typeEl.textContent = 'Type: ' + brewery.brewery_type;
  resultBody.append(typeEl);

  // Add the whole box to the results area on the webpage
  resultContentEl.append(resultCard);
}


async function searchApi(postalCode, type) {
  // Log the parameters for debug purposes
  console.log("Search Params:", { postalCode, type });

  var apiUrl = 'https://api.openbrewerydb.org/breweries';
  apiUrl += '?by_postal=' + postalCode + '&by_type=' + type;
  
  console.log(apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const breweryList = await response.json();
    // Check if the search returned any results
    if (breweryList.length === 0) {
      // Option 1: Show an alert
      alert("No breweries of that type found in that ZIP. Please try a different postal code or type.");

    } else {
      resultContentEl.innerHTML = '';
      for (var i = 0; i < breweryList.length; i++) {
        printResults(breweryList[i]);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// This function is called when someone presses the "Search" button.
function handleSearchFormSubmit(event) {
  // It makes sure the page doesn't refresh.
  event.preventDefault();

  // It gets the search word and format someone typed into the boxes.
  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  // If there's no search word, it shows an error.
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  // It does the search using the search word and format.
  searchApi(searchInputVal, formatInputVal);
}

// When someone presses "Search," it calls the function to handle it.
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// This starts the first function to get info from the web address.
getParams();

var body = document.getElementById("body");
var reshoot = document.getElementById("reshoot");
var ball = document.getElementById("ball");
var shooter = document.getElementById("shooter");
var cupsOut = [];

document.addEventListener("click", shootY);

function shootY(){
    document.removeEventListener("click", shootY); 
    var top = window.getComputedStyle(ball).getPropertyValue("top");
    ball.classList.remove("shootY");
    ball.classList.add("shootX");
    ball.style.top = top;
    document.documentElement.setAttribute("onclick", "shootX('top')");
    var shootYstr = "shootX('";
    var shootYstr1 = top.toString();
    var shootYstr2 = "')";
    var onclick = shootYstr.concat(shootYstr1, shootYstr2);
    document.getElementById("html").setAttribute("onclick", onclick);
    
}
function shootX(valueY){
    document.getElementById("html").setAttribute("onclick","");
    var top = parseFloat(valueY);
    var topABS = Math.abs(parseFloat(valueY));
    var left = window.getComputedStyle(ball).getPropertyValue("left");
    leftABS = parseFloat(left);
    ball.classList.remove("shootX");
    var newtop = top-325;
    var newtopStr = newtop.toString();
    var px = "px";
    var final = newtopStr.concat(px);
    let root = document.documentElement;
    root.style.setProperty('--top', (top)+ "px");
    root.style.setProperty('--top325', (top-325)+ "px");
    ball.classList.add("marginTop");
    ball.style.top = final;
    ball.style.left = left;
    if(140<topABS && topABS<175 && -125<leftABS && leftABS<-60){
        removeCup("1");
    }
    if(140<topABS && topABS<175 && -40<leftABS && leftABS<40){
        removeCup("2");
    }
    if(140<topABS && topABS<175 && 60<leftABS && leftABS<125){
        removeCup("3");
    }
    if(85<topABS && topABS<140 && -90<leftABS && leftABS<-25){
        removeCup("4");
    }
    if(85<topABS && topABS<140 && 15<leftABS && leftABS<80){
        removeCup("5");
    }
    if(25<topABS && topABS<80 && -45<leftABS && leftABS<45){
        removeCup("6");
    }
    setTimeout(function(){
        if(cupsOut.length == 6){
            var time = timer();
            document.getElementById("time").innerHTML = time + " seconds";
            document.getElementById("time").style.display="block";
            document.getElementById("restart").style.display="block";
        }else{
            reshoot.style.display = "block";
        }
    },1500);
}

function removeCup(cup){
    var cupStr = "cup";
    var element = cupStr.concat(cup);
    let alreadyExists = cupsOut.includes(cup);
    if(alreadyExists==false){  
        cupsOut.push(cup);
    }
    setTimeout(function(){
        document.getElementById(element).classList.add("fadeAway");
    },1000);
}

function reshoot1(){
    reshoot.style.display = "none";
    ball.classList.add("shootY");
    ball.style.top = "0px";
    ball.style.left = "0px";
    ball.classList.remove("marginTop");
    setTimeout(function(){
        document.addEventListener("click", shootY); 
    },1000);
}
var startDate = new Date();
var startTime = startDate.getTime();
function timer(){
    var dateNow = new Date ();
    var timeNow = dateNow.getTime();
    var timeDiff = timeNow - startTime;
    var secondsElapsed = Math.floor(timeDiff/1000);
    return (secondsElapsed); 
}
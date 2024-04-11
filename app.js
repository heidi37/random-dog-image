document.getElementById("copyrightYear").innerText = new Date().getFullYear();

const dogImages = document.querySelectorAll('img');
const newPicButton = document.querySelector('button');
const selectedBreed = document.querySelector('.dog-selector')
const appContent = document.querySelector('.app-content')
const moreDogsButton = document.querySelector('.more-dogs')

window.addEventListener('load', getBreeds)
selectedBreed.addEventListener("change", getImages)
moreDogsButton.addEventListener("click", getImages)

function getBreeds(){
  const XHR = new XMLHttpRequest();
  const defaultOption = document.createElement('option');
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "Select a breed";
  selectedBreed.appendChild(defaultOption);
  XHR.open("GET", 'https://dog.ceo/api/breeds/list/all');
  XHR.send();
  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200){
      const response = JSON.parse(XHR.responseText)
      Object.keys(response.message).forEach(breed => {
      const option = document.createElement('option');
      option.value = breed;
      option.textContent = breed.toUpperCase();
      selectedBreed.appendChild(option);
    });
    } else if (XHR.readyState == 4) {
      console.log("There is a problem")
    }
  }
}

function getImages() {
  for (let image of dogImages) {
  const XHR = new XMLHttpRequest();
  XHR.open("GET", `https://dog.ceo/api/breed/${selectedBreed.value}/images/random`);
  XHR.send();
  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200){
      const response = JSON.parse(XHR.responseText)
      image.style.background = `url(${response.message})`;
      image.style.backgroundRepeat = 'no-repeat';
      image.style.backgroundSize = "cover"
    } else if (XHR.readyState == 4) {
      console.log("There is a problem")
    }
  }
}
  moreDogsButton.style.display = "block";
}

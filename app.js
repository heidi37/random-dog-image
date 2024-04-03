const dogImages = document.querySelectorAll('img');
const newPicButton = document.querySelector('button');
const selectedBreed = document.querySelector('.dog-selector')

window.addEventListener('load', getBreeds)
newPicButton.addEventListener("click", getImages)

function getBreeds(){
  const XHR = new XMLHttpRequest();
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
      console.log(response)
      image.style.background = `url(${response.message})`;
      image.style.backgroundRepeat = 'no-repeat';
      image.style.backgroundSize = "cover"
    } else if (XHR.readyState == 4) {
      console.log("There is a problem")
    }
  }
}
}

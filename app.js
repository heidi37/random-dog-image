const dogImage = document.querySelector('img');
const newPicButton = document.querySelector('button')

newPicButton.addEventListener("click", function() {
  const XHR = new XMLHttpRequest();

  XHR.open("GET", "https://dog.ceo/api/breeds/image/random");
  XHR.send();
  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200){
      const response = JSON.parse(XHR.responseText)
      console.log(response)
      dogImage.setAttribute("src", response.message)
    } else if (XHR.readyState == 4) {
      console.log("There is a problem")
    }
  }
})

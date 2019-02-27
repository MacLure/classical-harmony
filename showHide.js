DCshowHideButton = document.querySelector('#DCshowHideButton')
SDshowHideButton = document.querySelector('#SDshowHideButton')
SubdominantshowHideButton = document.querySelector('#SubdominantshowHideButton')
CMshowHideButton = document.querySelector('#CMshowHideButton')

DCshowHideButton.addEventListener('click', function () {
  if (document.querySelector('.DCs').classList.contains("hidden")) {
    document.querySelector('.DCs').classList.remove("hidden")
    DCshowHideButton.classList.remove("rotateButton")
  } else {
    document.querySelector('.DCs').classList.add("hidden")
    DCshowHideButton.classList.add("rotateButton")
  }
})

SDshowHideButton.addEventListener('click', function () {
  if (document.querySelector('.SDs').classList.contains("hidden")) {
    document.querySelector('.SDs').classList.remove("hidden")
    SDshowHideButton.classList.remove("rotateButton")
  } else {
    document.querySelector('.SDs').classList.add("hidden")
    SDshowHideButton.classList.add("rotateButton")
  }
})

SubdominantshowHideButton.addEventListener('click', function () {
  if (document.querySelector('.subdominants').classList.contains("hidden")) {
    document.querySelector('.subdominants').classList.remove("hidden")
    SubdominantshowHideButton.classList.remove("rotateButton")
  } else {
    document.querySelector('.subdominants').classList.add("hidden")
    SubdominantshowHideButton.classList.add("rotateButton")
  }
})

CMshowHideButton.addEventListener('click', function () {
  if (document.querySelector('.CMs').classList.contains("hidden")) {
    document.querySelector('.CMs').classList.remove("hidden")
    CMshowHideButton.classList.remove("rotateButton")
  } else {
    document.querySelector('.CMs').classList.add("hidden")
    CMshowHideButton.classList.add("rotateButton")
  }
})
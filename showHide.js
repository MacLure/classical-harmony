DCshowHideButton = document.querySelector('#DCshowHideButton')
SDshowHideButton = document.querySelector('#SDshowHideButton')
SubdominantshowHideButton = document.querySelector('#subdominantshowHideButton')
CMshowHideButton = document.querySelector('#CMshowHideButton')

DCshowHideButton.addEventListener('click', function () {
  if (document.querySelector('.DCs').classList.contains("hidden")) {
    document.querySelector('.DCs').classList.remove("hidden")
  } else {
    document.querySelector('.DCs').classList.add("hidden")
  }
})

SDshowHideButton.addEventListener('click', function () {
  if (document.querySelector('.SDs').classList.contains("hidden")) {
    document.querySelector('.SDs').classList.remove("hidden")
  } else {
    document.querySelector('.SDs').classList.add("hidden")
  }
})

SubdominantshowHideButton.addEventListener('click', function () {
  if (document.querySelector('.subdominants').classList.contains("hidden")) {
    document.querySelector('.subdominants').classList.remove("hidden")
  } else {
    document.querySelector('.subdominants').classList.add("hidden")
  }
})

CMshowHideButton.addEventListener('click', function () {
  if (document.querySelector('.CMs').classList.contains("hidden")) {
    document.querySelector('.CMs').classList.remove("hidden")
  } else {
    document.querySelector('.CMs').classList.add("hidden")
  }
})
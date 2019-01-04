VF = Vex.Flow;
// -------------------------------
var div = document.getElementById("staff")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
var context = renderer.getContext();
var stave = new VF.Stave(10, 40, 120);


// -------------------------------

var selectedKey = keySelector.options[keySelector.selectedIndex].value;
var selectedClef = clefSelector.options[clefSelector.selectedIndex].value;

// -------------------------------

function showKeySignature() {
  stave.setClef(selectedClef.toString())
  stave.setKeySignature(selectedKey.toString());
  stave.setContext(context).draw();
}

function updateKey() {
  removeStaff() 
  selectedKey = keySelector.options[keySelector.selectedIndex].value;
  showKeySignature();
}

function updateClef() {
  removeStaff()
  selectedClef = clefSelector.options[clefSelector.selectedIndex].value;
  showKeySignature();
}

function removeStaff() {
  while (document.getElementsByTagName("svg")[0].hasChildNodes()) {
    document.getElementsByTagName("svg")[0].removeChild(document.getElementsByTagName("svg")[0].firstChild);
  }
}

updateKey()

// -------------------------------


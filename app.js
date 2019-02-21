VF = Vex.Flow;
// -------------------------------
const div = document.getElementById("staff")
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
const context = renderer.getContext();
const stave = new VF.Stave(10, 40, 120);

// const numeral1 = document.querySelector(".numeral1");
// const numeral2 = document.querySelector(".numeral2");
// const numeral3 = document.querySelector(".numeral3");
// const numeral4 = document.querySelector(".numeral4");
// const numeral5 = document.querySelector(".numeral5");
// const numeral6 = document.querySelector(".numeral6");
// const numeral7 = document.querySelector(".numeral7");



// -------------------------------

let selectedKey = keySelector.options[keySelector.selectedIndex].value;
let selectedTonality = tonalitySelector.options[tonalitySelector.selectedIndex].value;
let selectedClef = clefSelector.options[clefSelector.selectedIndex].value;

// -------------------------------

const relativeMinors = {
  "C": "Eb",
  "F": "Ab",
  "Bb": "Db",
  "Eb": "Gb",
  "Ab": "Cb",
  "Db": "E",
  "F#": "A",
  "B": "D",
  "E": "G",
  "A": "C",
  "D": "F",
  "G": "Bb"
}

const numerals = {
  "numeral1": {"maj": ["I", "maj"], "min": ["i", "min"]},
  "numeral2": {"maj": ["ii", "min"], "min": ["iio", "dim"]},
  "numeral3": {"maj": ["iii", "min"], "min": ["III", "maj", "III+", "aug"]},
  "numeral4": {"maj": ["IV", "maj"], "min": ["iv", "min"]},
  "numeral5": {"maj": ["V", "maj"], "min": ["v", "min", "V", "maj"]},
  "numeral6": {"maj": ["vi", "min"], "min": ["VI", "maj"]},
  "numeral7": {"maj": ["viio", "dim"], "min": ["VII", "maj", "viio", "dim"]},
}

const KeySignatures = {
  "C" : ["C", "D", "E", "F", "G", "A", "B"],
  "F" : ["F", "G", "A", "B♭", "C", "D", "E"],
  "Bb" : ["B♭", "C", "D", "E♭", "F", "G", "A"],
  "Eb" : ["E♭", "F", "G", "A♭", "B♭", "C", "D"],
  "Ab" : ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"],
  "Db" : ["D♭", "E♭", "F", "G", "A♭", "B♭", "C"],
  "F#" : ["F♯", "G♯", "A♯", "B", "C♯", "D♯", "E♯"],
  "B" : ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"],
  "E" : ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"],
  "A" : ["A", "B", "C♯", "D", "E", "F♯", "G♯"],
  "D" : ["D", "E", "F♯", "G", "A", "B", "C♯"],
  "G" : ["G", "A", "B", "C", "D", "E", "F♯"],
  
};

function sharpen(tone) {
  if (tone.length === 1 || tone[tone.length-1] === "♯") {
    return (tone + `♯`)
  } else if (tone[tone.length-1] === "♭") {
    return (tone[0] + `♮`)
  }
}

function flatten(tone) {
  if (tone.length === 1 || tone[tone.length-1] === "♭") {
    return (tone + `♭`)
  } else if (tone[tone.length-1] === "♯") {
    return (tone[0] + `♮`)
  }
}

function showKeySignature() {
  stave.setClef(selectedClef.toString())
  stave.setKeySignature(selectedKey.toString());
  stave.setContext(context).draw();
}

function showSecondaryDominants() {
  if (selectedTonality === "maj") {
    document.querySelector(`.SDnumeralV7`).innerHTML=null
    document.querySelector(`.SDnumeralVII7`).innerHTML=null
    for (i = 2 ; i <= 6 ; i++) {
      let numeral = `numeral${i}`
      if (numerals[numeral][selectedTonality][0][numerals[numeral][selectedTonality][0].length-1] === "o") {
        superscript = numerals[numeral][selectedTonality][0][numerals[numeral][selectedTonality][0].length-1]
        document.querySelector(`.SDnumeralV${i}`).innerHTML=`V/${numerals[numeral][selectedTonality][0]}`.slice(0, `V/${numerals[numeral][selectedTonality][0]}`.length-1) + `<span class="accidental">${superscript}</span>`
        document.querySelector(`.SDnumeralVII${i}`).innerHTML=`vii<span class="superscript">o</span>/${numerals[numeral][selectedTonality][0]}`.slice(0, `vii<span class="accidental">o</span>/${numerals[numeral][selectedTonality][0]}`.length-1) + `<span class="accidental">${superscript}</span>`
      } else {
        document.querySelector(`.SDnumeralV${i}`).innerHTML=`V/${numerals[numeral][selectedTonality][0]}`
        document.querySelector(`.SDnumeralVII${i}`).innerHTML=`vii<span class="superscript">o</span>/${numerals[numeral][selectedTonality][0]}`
      }
    }
    document.querySelector(`.SDchordV7`).innerHTML=null
    document.querySelector(`.SDchordV7`).innerHTML=null
    let Vlocator = 4
    let VIIlocator = -1
    for (i = 1 ; i <= 5 ; i++) {
      if (KeySignatures[selectedKey][i+Vlocator].length>1) {
        document.querySelector(`.SDchordV${i+1}`).innerHTML=KeySignatures[selectedKey][i+Vlocator][0] + `<span class="accidental">${KeySignatures[selectedKey][i+Vlocator][1]}</span>` + "maj"
      } else {
        document.querySelector(`.SDchordV${i+1}`).innerHTML=KeySignatures[selectedKey][i+Vlocator]+"maj"
      }
      let leadingToneChord = i === 3 ? KeySignatures[selectedKey][i+VIIlocator] : sharpen(KeySignatures[selectedKey][i+VIIlocator])
      if (leadingToneChord.length>1) {
        document.querySelector(`.SDchordVII${i+1}`).innerHTML=leadingToneChord[0] + `<span class="accidental">${leadingToneChord.slice(1, leadingToneChord.length)}</span>` + "dim"
      } else {
        document.querySelector(`.SDchordVII${i+1}`).innerHTML=KeySignatures[selectedKey][i+VIIlocator]+"dim"
      }
      if (i >= 2 ) {Vlocator = -3}
    }
    





  }
  if (selectedTonality === "min") {
    document.querySelector(`.SDnumeralV2`).innerHTML=null
    document.querySelector(`.SDnumeralVII2`).innerHTML=null
    
    for (i = 3 ; i <= 7 ; i++) {
      let numeral = `numeral${i}`
      if (numerals[numeral][selectedTonality][0][numerals[numeral][selectedTonality][0].length-1] === "o") {
        superscript = numerals[numeral][selectedTonality][0][numerals[numeral][selectedTonality][0].length-1]
        document.querySelector(`.SDnumeralV${i}`).innerHTML=`V/${numerals[numeral][selectedTonality][0]}`.slice(0, `V/${numerals[numeral][selectedTonality][0]}`.length-1) + `<span class="accidental">${superscript}</span>`
        document.querySelector(`.SDnumeralVII${i}`).innerHTML=`vii<span class="superscript">o</span>/${numerals[numeral][selectedTonality][0]}`.slice(0, `vii<span class="accidental">o</span>/${numerals[numeral][selectedTonality][0]}`.length-1) + `<span class="accidental">${superscript}</span>`
      } else {
        document.querySelector(`.SDnumeralV${i}`).innerHTML=`V/${numerals[numeral][selectedTonality][0]}`
        document.querySelector(`.SDnumeralVII${i}`).innerHTML=`vii<span class="superscript">o</span>/${numerals[numeral][selectedTonality][0]}`
      }
    }
    document.querySelector(`.SDchordV2`).innerHTML=null
    document.querySelector(`.SDchordVII2`).innerHTML=null
    let Vlocator = 2
    for (i = 2 ; i <= 6 ; i++) {
      if (KeySignatures[selectedKey][i+Vlocator].length>1) {
        document.querySelector(`.SDchordV${i+1}`).innerHTML=KeySignatures[selectedKey][i+Vlocator][0] + `<span class="accidental">${KeySignatures[selectedKey][i+Vlocator][1]}</span>` + "maj"
      } else {
        document.querySelector(`.SDchordV${i+1}`).innerHTML=KeySignatures[selectedKey][i+Vlocator]+"maj"
      }
      if (i >= 4 ) {Vlocator = -5}
    }
  }
}


function updateKey() {
  removeStaff() 
  selectedTonality = tonalitySelector.options[tonalitySelector.selectedIndex].value;
  if (selectedTonality === "min") {
    if (selectedKey === "Ab") {
      selectedKey = "B"
    } else {
      selectedKey = relativeMinors[keySelector.options[keySelector.selectedIndex].value]
    }
    let offset=4
    for (i = 1 ; i <= Object.keys(numerals).length ; i++) {
      if (KeySignatures[selectedKey][i+offset].length>1) {
        document.querySelector(`.DC${i}`).innerHTML=KeySignatures[selectedKey][i+offset][0]+ `<span class="accidental">${KeySignatures[selectedKey][i+offset][1]}</span>` + numerals[`numeral${i}`]["min"][1]
      } else {
        document.querySelector(`.DC${i}`).innerHTML=KeySignatures[selectedKey][i+offset] + numerals[`numeral${i}`]["min"][1]
      } if (i === 2) {offset = -3}
      if (numerals[`numeral${i}`]["min"][0][numerals[`numeral${i}`]["min"][0].length-1] === "o") {
        superscript = numerals[`numeral${i}`]["min"][0][numerals[`numeral${i}`]["min"][0].length-1]
        document.querySelector(`.numeral${[i]}`).innerHTML=numerals[`numeral${i}`]["min"][0].slice(0, numerals[`numeral${i}`]["min"][0].length-1) + `<span class="accidental">${superscript}</span>`
      } else {
        document.querySelector(`.numeral${[i]}`).innerHTML=numerals[`numeral${i}`]["min"][0]
      }
    }
    for (i = 3 ; i <= Object.keys(numerals).length ; i +=2) {
      if (i=== 7) {
        let leadingToneChord = KeySignatures[selectedKey][i+offset]
        document.querySelector(`.HMDC${i}`).innerHTML=sharpen(leadingToneChord) + numerals[`numeral${i}`]["min"][3]
      }
      else if (KeySignatures[selectedKey][i+offset].length>1) {
        document.querySelector(`.HMDC${i}`).innerHTML=KeySignatures[selectedKey][i+offset][0]+ `<span class="accidental">${KeySignatures[selectedKey][i+offset][1]}</span>` + numerals[`numeral${i}`]["min"][3]
      } else {
        document.querySelector(`.HMDC${i}`).innerHTML=KeySignatures[selectedKey][i+offset] + numerals[`numeral${i}`]["min"][3]
      } if (numerals[`numeral${i}`]["min"][2][numerals[`numeral${i}`]["min"][2].length-1] === "+" || numerals[`numeral${i}`]["min"][2][numerals[`numeral${i}`]["min"][2].length-1] === "o") {
        document.querySelector(`.HMnumeral${[i]}`).innerHTML=numerals[`numeral${i}`]["min"][2].slice(0, numerals[`numeral${i}`]["min"][2].length-1)+`<span class="superscript">${numerals[`numeral${i}`]["min"][2][numerals[`numeral${i}`]["min"][2].length-1]}</span>` 
      } else {
        document.querySelector(`.HMnumeral${[i]}`).innerHTML=numerals[`numeral${i}`]["min"][2]
      }
    }


  } else {
    selectedKey = keySelector.options[keySelector.selectedIndex].value
    let offset=-1
    for (i = 1 ; i <= Object.keys(numerals).length ; i++) {
      if (KeySignatures[selectedKey][i+offset].length>1) {
        document.querySelector(`.DC${i}`).innerHTML=KeySignatures[selectedKey][i+offset][0]+ `<span class="accidental">${KeySignatures[selectedKey][i+offset][1]}</span>` + numerals[`numeral${i}`]["maj"][1]
      } else {
        document.querySelector(`.DC${i}`).innerHTML=KeySignatures[selectedKey][i+offset] + numerals[`numeral${i}`]["maj"][1]
      } if (i === 7) {offset = 0}
      if (numerals[`numeral${i}`]["maj"][0][numerals[`numeral${i}`]["maj"][0].length-1] === "o") {
        superscript = numerals[`numeral${i}`]["maj"][0][numerals[`numeral${i}`]["maj"][0].length-1]
        document.querySelector(`.numeral${[i]}`).innerHTML=(`.HMnumeral${[i]}`).innerHTML=numerals[`numeral${i}`]["maj"][0].slice(0, numerals[`numeral${i}`]["maj"][0].length-1) + `<span class="accidental">${superscript}</span>`
      } else {
        document.querySelector(`.numeral${[i]}`).innerHTML=numerals[`numeral${i}`]["maj"][0]
      }
    }
    for (i = 3 ; i <= Object.keys(numerals).length ; i +=2) {
    document.querySelector(`.HMDC${i}`).innerHTML=null
    document.querySelector(`.HMnumeral${[i]}`).innerHTML=null
    }
  }
  showKeySignature();
  showSecondaryDominants()
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
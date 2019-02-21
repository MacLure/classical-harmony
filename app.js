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

const keySignatures = {
  "C" : ["C", "D", "E", "F", "G", "A", "B"],
  "Am" : ["A", "B", "C", "D", "E", "F", "G"],
  "F" : ["F", "G", "A", "Bb", "C", "D", "E"],
  "Dm" : ["D", "E", "F", "G", "A", "Bb", "C"],
  "Bb" : ["Bb", "C", "D", "Eb", "F", "G", "A"],
  "Gm" : ["G", "A", "Bb", "C", "D", "Eb", "F"],
  "Eb" : ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  "Cm" : ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
  "Ab" : ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  "Fm" : ["F", "G", "Ab", "Bb", "C", "D", "Eb"],
  "Db" : ["Db", "Eb", "F", "G", "Ab", "Bb", "C"],
  Gb : ["D#", "E#", "F#", "G#", "A#", "B", "C#"],
  "Ebm" : ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
  "Cb" : ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"],
  "Abm" : ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "Gb"],
  "G" : ["G", "A", "B", "C", "D", "E", "F#"],
  "Em" : ["E", "F#", "G", "A", "B", "C", "D"],
  "D" : ["D", "E", "F#", "G", "A", "B", "C#"],
  "Bm" : ["B", "C#", "D", "E", "F#", "G", "A"],
  "A" : ["A", "B", "C#", "D", "E", "F#", "G#"],
  "F#m" : ["F#", "G#", "A", "B", "C#", "D", "E"],
  "E" : ["E", "F#", "G#", "A", "B", "C#", "D#"],
  "C#m" : ["C#", "D#", "E", "F#", "G#", "A", "B"],
  "B" : ["B", "C#", "D#", "E", "F#", "G#", "A#"],
  "G#m" : ["C#", "D#", "E", "F#", "G#", "A#", "B"],
  "F#" : ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
  "D#m" : ["C#", "D#", "E#", "F#", "G#", "A#", "B"],
  "C#" : ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
  "#Am" : ["A#", "B#", "C#", "D#", "E#", "F#", "G#"],
  "Bbm" : ["Bb", "C", "Db", "Eb", "F", "G", "Ab"],
  "Dbm" : ["C#", "D#", "E", "F#", "G#", "A", "B"],
  "A#" : ["Bb", "C", "D", "Eb", "F", "G", "A"],
  "G#" : ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "Gb"],
  "D#" : ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  "E#" : ["F", "G", "A", "Bb", "C", "D", "E"],
};

const keySignaturesOld = {
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
  "Cm" : ["C", "D", "E♭", "F", "G", "A♭", "B♭"],
  "Fm" : ["F", "G", "A♭", "B♭", "C", "D", "E♭"],
  "Bbm" : ["B♭", "C", "D♭", "E♭", "F", "G", "A♭"],
  "Ebm" : ["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭"],
  "Abm" : ["A♭", "B♭", "C♭", "D♭", "E♭", "F♭", "G♭"],
  "Dbm" : ["C♯", "D♯", "E", "F♯", "G♯", "A", "B"],
  // keyGb : ["D♯", "E♯", "F♯", "G♯", "A♯", "B", "C♯"],
  "F#m" : ["F♯", "G♯", "A", "B", "C♯", "D", "E"],
  "Bm" : ["B", "C♯", "D", "E", "F♯", "G", "A"],
  "Em" : ["E", "F♯", "G", "A", "B", "C", "D"],
  "Am" : ["A", "B", "C", "D", "E", "F", "G"],
  "Dm" : ["D", "E", "F", "G", "A", "B♭", "C"],
  "Gm" : ["G", "A", "B♭", "C", "D", "E♭", "F"],
};

const naturalMinorScales = {
  Cm : ["C", "D", "E♭", "F", "G", "A♭", "B♭"],
  Fm : ["F", "G", "A♭", "B♭", "C", "D", "E♭"],
  Bbm : ["B♭", "C", "D♭", "E♭", "F", "G", "A♭"],
  Ebm : ["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭"],
  Abm : ["A♭", "B♭", "C♭", "D♭", "E♭", "F♭", "G♭"],
  Dbm : ["C♯", "D♯", "E", "F♯", "G♯", "A", "B"],
  // keyGb : ["D♯", "E♯", "F♯", "G♯", "A♯", "B", "C♯"],
  Fsm : ["F♯", "G♯", "A", "B", "C♯", "D", "E"],
  Bm : ["B", "C♯", "D", "E", "F♯", "G", "A"],
  Em : ["E", "F♯", "G", "A", "B", "C", "D"],
  Am : ["A", "B", "C", "D", "E", "F", "G"],
  Dm : ["D", "E", "F", "G", "A", "B♭", "C"],
  Gm : ["G", "A", "B♭", "C", "D", "E♭", "F"],
};

function sharpen(tone) {
  if (tone.length === 1 || tone[tone.length-1] === "#") {
    return (tone + `#`)
  } else if (tone[tone.length-1] === "b") {
    return (tone[0] + `n`)
  }
}

function flatten(tone) {
  if (tone.length === 1 || tone[tone.length-1] === "b") {
    return (tone + `b`)
  } else if (tone[tone.length-1] === "#") {
    return (tone[0] + `n`)
  }
}

function showKeySignature() {
  stave.setClef(selectedClef.toString())
  stave.setKeySignature(selectedKey.toString());
  stave.setContext(context).draw();
}

function updateStaff() {
  removeStaff() 
  selectedTonality = tonalitySelector.options[tonalitySelector.selectedIndex].value;
  if (selectedTonality === "min") {
    selectedKey = selectedKey + "m"
  }
  if (selectedTonality === "maj") {
    selectedKey = keySelector.options[keySelector.selectedIndex].value;
  }
  showKeySignature();
}

// function showSecondaryDominants() {
//   if (selectedTonality === "maj") {
//     document.querySelector(`.SDnumeralV7`).innerHTML=null
//     document.querySelector(`.SDnumeralVII7`).innerHTML=null
//     for (i = 2 ; i <= 6 ; i++) {
//       let numeral = `numeral${i}`
//       if (numerals[numeral][selectedTonality][0][numerals[numeral][selectedTonality][0].length-1] === "o") {
//         superscript = numerals[numeral][selectedTonality][0][numerals[numeral][selectedTonality][0].length-1]
//         document.querySelector(`.SDnumeralV${i}`).innerHTML=`V/${numerals[numeral][selectedTonality][0]}`.slice(0, `V/${numerals[numeral][selectedTonality][0]}`.length-1) + `<span class="accidental">${superscript}</span>`
//         document.querySelector(`.SDnumeralVII${i}`).innerHTML=`vii<span class="superscript">o</span>/${numerals[numeral][selectedTonality][0]}`.slice(0, `vii<span class="accidental">o</span>/${numerals[numeral][selectedTonality][0]}`.length-1) + `<span class="accidental">${superscript}</span>`
//       } else {
//         document.querySelector(`.SDnumeralV${i}`).innerHTML=`V/${numerals[numeral][selectedTonality][0]}`
//         document.querySelector(`.SDnumeralVII${i}`).innerHTML=`vii<span class="superscript">o</span>/${numerals[numeral][selectedTonality][0]}`
//       }
//     }
//     document.querySelector(`.SDchordV7`).innerHTML=null
//     document.querySelector(`.SDchordV7`).innerHTML=null
//     let Vlocator = 4
//     let VIIlocator = -1
//     for (i = 1 ; i <= 5 ; i++) {
//       if (KeySignatures[selectedKey][i+Vlocator].length>1) {
//         document.querySelector(`.SDchordV${i+1}`).innerHTML=KeySignatures[selectedKey][i+Vlocator][0] + `<span class="accidental">${KeySignatures[selectedKey][i+Vlocator][1]}</span>` + "maj"
//       } else {
//         document.querySelector(`.SDchordV${i+1}`).innerHTML=KeySignatures[selectedKey][i+Vlocator]+"maj"
//       }
//       let leadingToneChord = i === 3 ? KeySignatures[selectedKey][i+VIIlocator] : sharpen(KeySignatures[selectedKey][i+VIIlocator])
//       if (leadingToneChord.length>1) {
//         document.querySelector(`.SDchordVII${i+1}`).innerHTML=leadingToneChord[0] + `<span class="accidental">${leadingToneChord.slice(1, leadingToneChord.length)}</span>` + "dim"
//       } else {
//         document.querySelector(`.SDchordVII${i+1}`).innerHTML=KeySignatures[selectedKey][i+VIIlocator]+"dim"
//       }
//       if (i >= 2 ) {Vlocator = -3}
//     }
    

//   }
//   if (selectedTonality === "min") {
//     document.querySelector(`.SDnumeralV2`).innerHTML=null
//     document.querySelector(`.SDnumeralVII2`).innerHTML=null
    
//     for (i = 3 ; i <= 7 ; i++) {
//       let numeral = `numeral${i}`
//       if (numerals[numeral][selectedTonality][0][numerals[numeral][selectedTonality][0].length-1] === "o") {
//         superscript = numerals[numeral][selectedTonality][0][numerals[numeral][selectedTonality][0].length-1]
//         document.querySelector(`.SDnumeralV${i}`).innerHTML=`V/${numerals[numeral][selectedTonality][0]}`.slice(0, `V/${numerals[numeral][selectedTonality][0]}`.length-1) + `<span class="accidental">${superscript}</span>`
//         document.querySelector(`.SDnumeralVII${i}`).innerHTML=`vii<span class="superscript">o</span>/${numerals[numeral][selectedTonality][0]}`.slice(0, `vii<span class="accidental">o</span>/${numerals[numeral][selectedTonality][0]}`.length-1) + `<span class="accidental">${superscript}</span>`
//       } else {
//         document.querySelector(`.SDnumeralV${i}`).innerHTML=`V/${numerals[numeral][selectedTonality][0]}`
//         document.querySelector(`.SDnumeralVII${i}`).innerHTML=`vii<span class="superscript">o</span>/${numerals[numeral][selectedTonality][0]}`
//       }
//     }
//     document.querySelector(`.SDchordV2`).innerHTML=null
//     document.querySelector(`.SDchordVII2`).innerHTML=null
//     let Vlocator = 2
//     let VIIlocator = -3
//     for (i = 2 ; i <= 6 ; i++) {
//       if (KeySignatures[selectedKey][i+Vlocator].length>1) {
//         document.querySelector(`.SDchordV${i+1}`).innerHTML=KeySignatures[selectedKey][i+Vlocator][0] + `<span class="accidental">${KeySignatures[selectedKey][i+Vlocator][1]}</span>` + "maj"
//       } else {
//         document.querySelector(`.SDchordV${i+1}`).innerHTML=KeySignatures[selectedKey][i+Vlocator]+"maj"
//       }
//       let leadingToneChord = i === 3 ? KeySignatures[selectedKey][i+VIIlocator] : sharpen(KeySignatures[selectedKey][i+VIIlocator])
//       if (leadingToneChord.length>1) {
//         document.querySelector(`.SDchordVII${i+1}`).innerHTML=leadingToneChord[0] + `<span class="accidental">${leadingToneChord.slice(1, leadingToneChord.length)}</span>` + "dim"
//       } else {
//         document.querySelector(`.SDchordVII${i+1}`).innerHTML=KeySignatures[selectedKey][i+VIIlocator]+"dim"
//       }
//       if (i >= 4 ) {VIIlocator = -2}
//     }
//   }
// }


function showDiatonicChords() {
  for (i = 1 ; i <= keySignatures[selectedKey].length ; i++) {
    document.querySelector(`.DC${i}`).innerHTML = keySignatures[selectedKey][i-1] + numerals[`numeral${i}`][selectedTonality][1]
    document.querySelector(`.numeral${i}`).innerHTML = numerals[`numeral${i}`][selectedTonality][0]
    if (selectedTonality === "min") {
      if (i === 3 || i === 5 || i === 7) {
        if (i === 7) {
          let leadingToneChord = sharpen(keySignatures[selectedKey][i-1])
          document.querySelector(`.HMDC${i}`).innerHTML = leadingToneChord + numerals[`numeral${i}`][selectedTonality][3]
        } else {
          document.querySelector(`.HMDC${i}`).innerHTML = keySignatures[selectedKey][i-1] + numerals[`numeral${i}`][selectedTonality][3]
        }
        document.querySelector(`.HMnumeral${i}`).innerHTML = numerals[`numeral${i}`][selectedTonality][2]
      }
    }
    if (selectedTonality === "maj") {
      document.querySelector(`.HMDC${i}`).innerHTML = null
      document.querySelector(`.HMnumeral${i}`).innerHTML = null
    }
  }
}

function showSecondaryDominants() {
  for (i = 2 ; i <= keySignatures[selectedKey].length ; i++) {
    let tonicizedChord = keySignatures[selectedKey][i-1]
    document.querySelector(`.SDchordV${i}`).innerHTML = keySignatures[tonicizedChord][4] + "maj"
    document.querySelector(`.SDnumeralV${i}`).innerHTML = "V/" + numerals[`numeral${i}`][selectedTonality][0]
    document.querySelector(`.SDchordVII${i}`).innerHTML = keySignatures[tonicizedChord][6] + "dim"
    document.querySelector(`.SDnumeralVII${i}`).innerHTML = `vii<span class="superscript">o</span>/` + numerals[`numeral${i}`][selectedTonality][0]
  }
  if (selectedTonality === "maj") {
    document.querySelector(`.SDchordV7`).innerHTML = null
    document.querySelector(`.SDnumeralV7`).innerHTML = null
    document.querySelector(`.SDchordVII7`).innerHTML = null
    document.querySelector(`.SDnumeralVII7`).innerHTML = null
  } else if (selectedTonality === "min") {
    document.querySelector(`.SDchordV2`).innerHTML = null
    document.querySelector(`.SDnumeralV2`).innerHTML = null
    document.querySelector(`.SDchordVII2`).innerHTML = null
    document.querySelector(`.SDnumeralVII2`).innerHTML = null
  }
}

function showNeapolitan6th() {
  document.querySelector(`.N6chord`).innerHTML = flatten(keySignatures[selectedKey][1])+ "maj"
}

function showAugmentedSixthChords() {
    document.querySelector(`.it61`).innerHTML = flatten(keySignatures[selectedKey][5])
    document.querySelector(`.it62`).innerHTML = keySignatures[selectedKey][0]
    document.querySelector(`.it63`).innerHTML = keySignatures[selectedKey][0]
    document.querySelector(`.it64`).innerHTML = sharpen(keySignatures[selectedKey][3])

    document.querySelector(`.fr61`).innerHTML = flatten(keySignatures[selectedKey][5])
    document.querySelector(`.fr62`).innerHTML = keySignatures[selectedKey][0]
    document.querySelector(`.fr63`).innerHTML = keySignatures[selectedKey][1]
    document.querySelector(`.fr64`).innerHTML = sharpen(keySignatures[selectedKey][3])

    document.querySelector(`.gr61`).innerHTML = flatten(keySignatures[selectedKey][5])
    document.querySelector(`.gr62`).innerHTML = keySignatures[selectedKey][0]
    document.querySelector(`.gr63`).innerHTML = keySignatures[selectedKey][2]
    document.querySelector(`.gr64`).innerHTML = sharpen(keySignatures[selectedKey][3])
}

function showChromaticMediants() {
  if (selectedTonality === "maj") {
    document.querySelector(`.CMchord1`).innerHTML = keySignatures[selectedKey][2] + "maj"
    document.querySelector(`.CMnumeral1`).innerHTML = "III"
    document.querySelector(`.CMchord2`).innerHTML = flatten(keySignatures[selectedKey][2]) + "min"
    document.querySelector(`.CMnumeral2`).innerHTML = `<span class="accidental">♭</span>iii`
    document.querySelector(`.CMchord3`).innerHTML = flatten(keySignatures[selectedKey][2]) + "maj"
    document.querySelector(`.CMnumeral3`).innerHTML = `<span class="accidental">♭</span>III`
  
    document.querySelector(`.CSMchord1`).innerHTML = keySignatures[selectedKey][5] + "maj"
    document.querySelector(`.CSMnumeral1`).innerHTML = "VI"
    document.querySelector(`.CSMchord2`).innerHTML = flatten(keySignatures[selectedKey][5]) + "min"
    document.querySelector(`.CSMnumeral2`).innerHTML = `<span class="accidental">♭</span>vi`
    document.querySelector(`.CSMchord3`).innerHTML = flatten(keySignatures[selectedKey][5]) + "maj"
    document.querySelector(`.CSMnumeral3`).innerHTML = `<span class="accidental">♭</span>VI`  
  }
  if (selectedTonality === "min") {
    document.querySelector(`.CMchord1`).innerHTML = keySignatures[selectedKey][2] + "min"
    document.querySelector(`.CMnumeral1`).innerHTML = "iii"
    document.querySelector(`.CMchord2`).innerHTML = sharpen(keySignatures[selectedKey][2]) + "maj"
    document.querySelector(`.CMnumeral2`).innerHTML = `<span class="accidental">♯</span>III`
    document.querySelector(`.CMchord3`).innerHTML = sharpen(keySignatures[selectedKey][2]) + "min"
    document.querySelector(`.CMnumeral3`).innerHTML = `<span class="accidental">♯</span>iii`
  
    document.querySelector(`.CSMchord1`).innerHTML = keySignatures[selectedKey][5] + "min"
    document.querySelector(`.CSMnumeral1`).innerHTML = "vi"
    document.querySelector(`.CSMchord2`).innerHTML = sharpen(keySignatures[selectedKey][5]) + "maj"
    document.querySelector(`.CSMnumeral2`).innerHTML = `<span class="accidental">♯</span>VI`
    document.querySelector(`.CSMchord3`).innerHTML = sharpen(keySignatures[selectedKey][5]) + "min"
    document.querySelector(`.CSMnumeral3`).innerHTML = `<span class="accidental">♯</span>vi`  
  }
}

function showChromaticMediantsSDs() {
  if (selectedTonality === "maj") {
    document.querySelector(`.CMSDVchord`).innerHTML = flatten(keySignatures[selectedKey][6]) + "maj"
    document.querySelector(`.CMSDVnumeral`).innerHTML = `V/<span class="accidental">♭</span>III`
    document.querySelector(`.CMSDVIIchord`).innerHTML = sharpen(keySignatures[selectedKey][1]) + "dim"
    document.querySelector(`.CMSDVIInumeral`).innerHTML = `vii<span class="superscript">o</span>/<span class="accidental">♭</span>III`
  
    document.querySelector(`.CSMSDVchord`).innerHTML = flatten(keySignatures[selectedKey][2]) + "maj"
    document.querySelector(`.CSMSDVnumeral`).innerHTML = `V/<span class="accidental">♭</span>VI`
    document.querySelector(`.CSMSDVIIchord`).innerHTML = sharpen(keySignatures[selectedKey][4]) + "dim"
    document.querySelector(`.CSMSDVIInumeral`).innerHTML = `vii<span class="superscript">o</span>/<span class="accidental">♭</span>VI`  
  }
  if (selectedTonality === "min") {
    document.querySelector(`.CMSDVchord`).innerHTML = sharpen(keySignatures[selectedKey][6]) + "maj"
    document.querySelector(`.CMSDVnumeral`).innerHTML = `V/<span class="accidental">♯</span>III`
    document.querySelector(`.CMSDVIIchord`).innerHTML = flatten(keySignatures[selectedKey][1]) + "dim"
    document.querySelector(`.CMSDVIInumeral`).innerHTML = `vii<span class="superscript">o</span>/<span class="accidental">♯</span>III`
  
    document.querySelector(`.CSMSDVchord`).innerHTML = sharpen(keySignatures[selectedKey][2]) + "maj"
    document.querySelector(`.CSMSDVnumeral`).innerHTML = `V/<span class="accidental">♯</span>VI`
    document.querySelector(`.CSMSDVIIchord`).innerHTML = sharpen(keySignatures[selectedKey][4]) + "dim"
    document.querySelector(`.CSMSDVIInumeral`).innerHTML = `vii<span class="superscript">o</span>/<span class="accidental">♯</span>VI`  
  }
}

  //   }
  //   let offset=4
  //   for (i = 1 ; i <= Object.keys(numerals).length ; i++) {
  //     if (KeySignatures[selectedKey][i+offset].length>1) {
  //       document.querySelector(`.DC${i}`).innerHTML=KeySignatures[selectedKey][i+offset][0]+ `<span class="accidental">${KeySignatures[selectedKey][i+offset][1]}</span>` + numerals[`numeral${i}`]["min"][1]
  //     } else {
  //       document.querySelector(`.DC${i}`).innerHTML=KeySignatures[selectedKey][i+offset] + numerals[`numeral${i}`]["min"][1]
  //     } if (i === 2) {offset = -3}
  //     if (numerals[`numeral${i}`]["min"][0][numerals[`numeral${i}`]["min"][0].length-1] === "o") {
  //       superscript = numerals[`numeral${i}`]["min"][0][numerals[`numeral${i}`]["min"][0].length-1]
  //       document.querySelector(`.numeral${[i]}`).innerHTML=numerals[`numeral${i}`]["min"][0].slice(0, numerals[`numeral${i}`]["min"][0].length-1) + `<span class="accidental">${superscript}</span>`
  //     } else {
  //       document.querySelector(`.numeral${[i]}`).innerHTML=numerals[`numeral${i}`]["min"][0]
  //     }
  //   }
  //   for (i = 3 ; i <= Object.keys(numerals).length ; i +=2) {
  //     if (i=== 7) {
  //       let leadingToneChord = sharpen(KeySignatures[selectedKey][i+offset])
  //       if (leadingToneChord.length > 1) {
  //         document.querySelector(`.HMDC${i}`).innerHTML=leadingToneChord[0] + `<span class="accidental">${leadingToneChord.slice(1, leadingToneChord.length)}</span>` + numerals[`numeral${i}`]["min"][3]
  //       } else {
  //       document.querySelector(`.HMDC${i}`).innerHTML=leadingToneChord + numerals[`numeral${i}`]["min"][3]
  //       }
  //     }
  //     else if (KeySignatures[selectedKey][i+offset].length>1) {
  //       document.querySelector(`.HMDC${i}`).innerHTML=KeySignatures[selectedKey][i+offset][0]+ `<span class="accidental">${KeySignatures[selectedKey][i+offset][1]}</span>` + numerals[`numeral${i}`]["min"][3]
  //     } else {
  //       document.querySelector(`.HMDC${i}`).innerHTML=KeySignatures[selectedKey][i+offset] + numerals[`numeral${i}`]["min"][3]
  //     } if (numerals[`numeral${i}`]["min"][2][numerals[`numeral${i}`]["min"][2].length-1] === "+" || numerals[`numeral${i}`]["min"][2][numerals[`numeral${i}`]["min"][2].length-1] === "o") {
  //       document.querySelector(`.HMnumeral${[i]}`).innerHTML=numerals[`numeral${i}`]["min"][2].slice(0, numerals[`numeral${i}`]["min"][2].length-1)+`<span class="superscript">${numerals[`numeral${i}`]["min"][2][numerals[`numeral${i}`]["min"][2].length-1]}</span>` 
  //     } else {
  //       document.querySelector(`.HMnumeral${[i]}`).innerHTML=numerals[`numeral${i}`]["min"][2]
  //     }
  //   }


  // } else {
  //   selectedKey = keySelector.options[keySelector.selectedIndex].value
  //   let offset=-1
  //   for (i = 1 ; i <= Object.keys(numerals).length ; i++) {
  //     if (KeySignatures[selectedKey][i+offset].length>1) {
  //       document.querySelector(`.DC${i}`).innerHTML=KeySignatures[selectedKey][i+offset][0]+ `<span class="accidental">${KeySignatures[selectedKey][i+offset][1]}</span>` + numerals[`numeral${i}`]["maj"][1]
  //     } else {
  //       document.querySelector(`.DC${i}`).innerHTML=KeySignatures[selectedKey][i+offset] + numerals[`numeral${i}`]["maj"][1]
  //     } if (i === 7) {offset = 0}
  //     if (numerals[`numeral${i}`]["maj"][0][numerals[`numeral${i}`]["maj"][0].length-1] === "o") {
  //       superscript = numerals[`numeral${i}`]["maj"][0][numerals[`numeral${i}`]["maj"][0].length-1]
  //       document.querySelector(`.numeral${[i]}`).innerHTML=(`.HMnumeral${[i]}`).innerHTML=numerals[`numeral${i}`]["maj"][0].slice(0, numerals[`numeral${i}`]["maj"][0].length-1) + `<span class="accidental">${superscript}</span>`
  //     } else {
  //       document.querySelector(`.numeral${[i]}`).innerHTML=numerals[`numeral${i}`]["maj"][0]
  //     }
  //   }
  //   for (i = 3 ; i <= Object.keys(numerals).length ; i +=2) {
  //   document.querySelector(`.HMDC${i}`).innerHTML=null
  //   document.querySelector(`.HMnumeral${[i]}`).innerHTML=null
  //   }
  // }

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

function updateKey() {
  updateStaff()
  showDiatonicChords()
  showSecondaryDominants()
  showNeapolitan6th()
  showAugmentedSixthChords()
  showChromaticMediants()
  showChromaticMediantsSDs()
}

updateKey()
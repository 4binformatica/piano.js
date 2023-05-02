/** @format */
Tone.start();
/* const synths = new Tone.DuoSynth().toDestination(); */
const synths = new Tone.Sampler({
  urls: {
      A0: "A0.mp3",
      C1: "C1.mp3",
      "D#1": "Ds1.mp3",
      "F#1": "Fs1.mp3",
      A1: "A1.mp3",
      C2: "C2.mp3",
      "D#2": "Ds2.mp3",
      "F#2": "Fs2.mp3",
      A2: "A2.mp3",
      C3: "C3.mp3",
      "D#3": "Ds3.mp3",
      "F#3": "Fs3.mp3",
      A3: "A3.mp3",
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
      C5: "C5.mp3",
      "D#5": "Ds5.mp3",
      "F#5": "Fs5.mp3",
      A5: "A5.mp3",
      C6: "C6.mp3",
      "D#6": "Ds6.mp3",
      "F#6": "Fs6.mp3",
      A6: "A6.mp3",
      C7: "C7.mp3",
      "D#7": "Ds7.mp3",
      "F#7": "Fs7.mp3",
      A7: "A7.mp3",
      C8: "C8.mp3"
  },


  release: 10,

  // Source locale des sons
  // baseUrl: "./audio/salamander/"

  baseUrl: "https://tonejs.github.io/audio/salamander/"
}).toDestination();
//let shift_pressed = false;
let current_section = 4;

document.onkeydown = function (e) {
  let key = e.code;
  let note = getNote(key);
  /* console.log("ba");
  console.log(note); */
  switch (key) {
    case "ShiftRight":
    case

 "ShiftLeft":
      shift_pressed = true;
      break;
    case "ArrowRight":
      if (current_section < 8) {
        current_section += 1;
        document.getElementById("current_section").innerHTML = current_section;
      } else alert("The highest section is 8");
      break;
    case "ArrowLeft":
      if (current_section > 1) {
        current_section -= 1;
        document.getElementById("current_section").innerHTML = current_section;
      } else alert("The lowest section is 1");
      break;
  }
  if (note != "N/A") playSound(note);
};

document.onkeyup = function (e) {
  let key = e.code;
  /* note = getNote(key); */
  if (!note.endsWith("#")){
    /* var a = document.getElementById(note);
    console.log("passo di qui");
    console.log(a);
    console.log(note);
    console.log("passato"); */
    document.getElementById(note).style.background = "white";
  }
  else
    document.getElementById(note.replace("#", "S")).style.background = "black";
};

function playSound(note) {
  synths.triggerAttack(`${note}${current_section}`, "1");

  document.getElementById(note.replace("#", "S")).style.background = "#33d6a6";
}

function playSound(note) {
  synths.triggerAttack(`${note}${current_section}`, "1");

  const isWhiteKey = !note.endsWith("#");
  if (isWhiteKey) {
    animateWhiteKeys(note.replace("#", "S"));
  }
}


function getNote(key) {
  let note = "N/A";
  console.log(key);
  switch (key) {
    case "KeyS":
      note = "C";
      //if (shift_pressed) note += "#";
      break;
    case "KeyE":
      note = "C" + "#";
      break;
    case "KeyD":
      note = "D";
      //if (shift_pressed) note += "#";
      break;
    case "KeyR":
      note = "D" + "#";
      break;
    case "KeyF":
      note = "E";
      break;
    case "KeyG":
      note = "F";
      //if (shift_pressed) note += "#";
      break;
    case "KeyY":
      note = "F" + "#";
      break;
    case "KeyH":
      note = "G";
      //if (shift_pressed) note += "#";
      break;
    case "KeyU":
      note = "G" + "#";
      break;
    case "KeyJ":
      note = "A";
      //if (shift_pressed) note += "#";
      break;
    case "KeyI":
      note = "A" + "#";
      break;
    case "KeyK":
      note = "B";
      break;
    //Non toccare mai questo codice se non sai cosa stai facendo
     case "KeyL":
      note = synths.triggerAttack(`C${current_section + 1}`, "1");
      synths.triggerRelease();
      //if (shift_pressed) note += "#";
      break;
      case "KeyO":
        note = "C" + "#";
        note = synths.triggerAttack(`${note}${current_section + 1}`, "1");
        synths.triggerRelease();
        break;
      case "KeyC":
        note = synths.triggerAttack(`D${current_section + 1}`, "1");
        synths.triggerRelease();
        //if (shift_pressed) note += "#";
        break;
      case "KeyP":
        note = "D" + "#";
        note = synths.triggerAttack(`D#${current_section + 1}`, "1");
        synths.triggerRelease();
        break;
      case "KeyV":
        note = synths.triggerAttack(`E${current_section + 1}`, "1");
        synths.triggerRelease();
        //if (shift_pressed) note += "#";
        break;
  } 
  return note;
}

//animation keys
function KeysAnimation(){
  animateWhiteKeys();
  animateBlackKeys();
}
function animateWhiteKeys() {
  const element = document.getElementById("#KeyS");
  element.classList.add(".playing");
  setTimeout(() => {
    element.classList.remove(".playing");
  }, 100);
}

function animateBlackKeys() {
}

//Metronome Sound


const clickSound = new Audio('note/topolino.mp3');
let interval;
let bpm = 120;
          
const bpmInput = document.querySelector('.bpm-input');
const minButton = document.querySelector('.min');
const maxButton = document.querySelector('.max');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
          
function startMetronome() {
  const intervalMs = 60000 / bpm;
          
  clickSound.currentTime = 0;
  clickSound.play();
          
  interval = setInterval(() => {
    clickSound.currentTime = 0;
    clickSound.play();
  }, intervalMs);
          
  startButton.style.display = 'none';
  stopButton.style.display = 'block';
}
          
function stopMetronome() {
  clearInterval(interval);
  clickSound.pause();
          
  startButton.style.display = 'block';
  stopButton.style.display = 'none';
}
          
function updateBPM(value) {
  bpm = value;
  bpmInput.value = bpm;
}
          
bpmInput.addEventListener('input', (event) => {
  updateBPM(event.target.value);
});
          
minButton.addEventListener('click', () => {
  if (bpm > 20) {
    updateBPM(bpm - 1);
  }
});
          
maxButton.addEventListener('click', () => {
  if (bpm < 300) {
    updateBPM(bpm + 1);
  }
});
          
startButton.addEventListener('click', () => {
  startMetronome();
});
          
stopButton.addEventListener('click', () => {
  stopMetronome();
});


//image preview
const fileInput = document.getElementById('file-input');
const previewImage = document.getElementById('preview-image');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', (event) => {
    previewImage.src = event.target.result;
    fileInput.parentNode.removeChild(fileInput);
  });

  reader.readAsDataURL(file);
});

previewImage.addEventListener('click', () => {
  fileInput.click();
});
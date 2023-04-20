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
  note = getNote(key);
  if (!note.endsWith("#"))
    document.getElementById(note).style.background = "white";
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
  const element = document.querySelectorAll(white);
  element.classList.add("playing");
  setTimeout(() => {
    element.classList.remove("playing");
  }, 100);
}

function animateBlackKeys() {
}

//Metronome Sound

/* const bpmValue = document.querySelector('.value');
const minButton = document.querySelector('.min');
const maxButton = document.querySelector('.max');
let bpm = parseInt(bpmValue.textContent);

const clickSound = new Tone.MembraneSynth().toDestination();
const loop = new Tone.Loop((time) => {
  clickSound.triggerAttackRelease('C2', '8n', time);
}, '4n').start(0);

document.querySelector('.start').addEventListener('click', () => {
  const intervalMs = 60000 / bpm;

  loop.interval = intervalMs / 1000;

  Tone.Transport.start();

  document.querySelector('.start').style.display = 'none';
  document.querySelector('.stop').style.display = 'block';
});

document.querySelector('.stop').addEventListener('click', () => {
  Tone.Transport.stop();

  document.querySelector('.start').style.display = 'block';
  document.querySelector('.stop').style.display = 'none';
});

minButton.addEventListener('click', () => {
  bpm--;
  if (bpm < parseInt(bpmValue.min)) {
    bpm = parseInt(bpmValue.min);
  }
  bpmValue.textContent = bpm;
});

maxButton.addEventListener('click', () => {
  bpm++;
  if (bpm > parseInt(bpmValue.max)) {
    bpm = parseInt(bpmValue.max);
  }
  bpmValue.textContent = bpm;
}); */


const audio = new Audio('note/topolino.mp3');
let interval;

const bpmValue = document.querySelector('.value');
const minButton = document.querySelector('.min');
const maxButton = document.querySelector('.max');
let bpm = parseInt(bpmValue.textContent);

document.querySelector('.start').addEventListener('click', () => {
  const intervalMs = 60000 / bpm;

  interval = setInterval(() => {
    audio.currentTime = 0;
    audio.play();
  }, intervalMs);

  document.querySelector('.start').style.display = 'none';
  document.querySelector('.stop').style.display = 'block';
});

document.querySelector('.stop').addEventListener('click', () => {
  clearInterval(interval);

  audio.pause();
  audio.currentTime = 0;

  document.querySelector('.start').style.display = 'block';
  document.querySelector('.stop').style.display = 'none';
});

minButton.addEventListener('click', () => {
  bpm--;
  if (bpm < parseInt(bpmValue.min)) {
    bpm = parseInt(bpmValue.min);
  }
  bpmValue.textContent = bpm;
});

maxButton.addEventListener('click', () => {
  bpm++;
  if (bpm > parseInt(bpmValue.max)) {
    bpm = parseInt(bpmValue.max);
  }
  bpmValue.textContent = bpm;
});

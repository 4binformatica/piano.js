/** @format */
Tone.start();
const synths = new Tone.Synth().toDestination();

let shift_pressed = false;
let current_section = 4;

document.onkeydown = function (e) {
  let key = e.code;
  let note = getNote(key);
  switch (key) {
    case "ShiftRight":
    case "ShiftLeft":
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
  if (key === "ShiftLeft" || key === "ShiftRight") shift_pressed = false;
  synths.triggerRelease();
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

function getNote(key) {
  let note = "N/A";
  switch (key) {
    case "KeyS":
      note = "C";
      if (shift_pressed) note += "#";
      break;
    case "KeyD":
      note = "D";
      if (shift_pressed) note += "#";
      break;
    case "KeyF":
      note = "E";
      break;
    case "KeyG":
      note = "F";
      if (shift_pressed) note += "#";
      break;
    case "KeyH":
      note = "G";
      if (shift_pressed) note += "#";
      break;
    case "KeyJ":
      note = "A";
      if (shift_pressed) note += "#";
      break;
    case "KeyK":
      note = "B";
      break;
    //Non toccare mai questo codice se non sai cosa stai facendo
     case "KeyL":
      note = synths.triggerAttack(`C${current_section + 1}`, "1");
      synths.triggerRelease();
      if (shift_pressed) note += "#";
      break;
  }
  return note;
}
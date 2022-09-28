window.onload = setUp;

document.fonts.ready.then(() => {
     document.getElementById("stack").classList.add("loaded");
});

const Color = {
     pink: 'pink',
     orange: 'orange',
     yellow: 'yellow',
     green: 'green',
     aqua: 'aqua',
     blue: 'blue',
     indigo: 'indigo',
     purple: 'purple',
};

let currentColorIndex = 0;

function setUp() {
     document.getElementById("background").addEventListener('click', function handleClick(event) {
          if (event.target.tagName !== "A") {
               applyNextColor();
          }
     });

     applyRandomColor()
}

function applyRandomColor() {
     var randomIndex = Math.floor(Math.random() * 8);
     currentColorIndex = randomIndex;
     setColor(currentColorIndex);
}

function applyNextColor() {
     currentColorIndex = (currentColorIndex + 1) % 8;
     setColor(currentColorIndex);
}

function setColor(index) {
     var colors = Object.keys(Color);
     var colorLiterals = colors.map(colorMap);
     
     randomColorString = colors[index];
     var randomColorHex = colorLiterals[index];
     document.getElementById("event").src = `assets/event_${randomColorString}.png`;
     document.getElementById("icon").src = `assets/upahead_${randomColorString}.png`;

     document.getElementById("background").style.backgroundColor = `${randomColorHex}1a`;
     document.getElementById("stayTuned").style.color = `${randomColorHex}`;
     document.getElementById("bottomButton").style.color = `${randomColorHex}`;
     document.getElementById("presskitButton").style.color = `${randomColorHex}`;
     // document.getElementById("getNotified").style.color = `${randomColorHex}`;

     const buttons = document.querySelectorAll('.button');
     buttons.forEach((button) => {
       button.style.setProperty('--hover-background-color', `${randomColorHex}2a`);
       button.style.setProperty('--regular-background-color', `${randomColorHex}1a`);
     });

     const menuButtons = document.querySelectorAll('.menubutton');
     menuButtons.forEach((button) => {
       button.style.setProperty('--hover-background-color', `${randomColorHex}2a`);
       button.style.setProperty('--regular-background-color', `${randomColorHex}1a`);
     });
}

function colorMap(color) {
     if (color === 'pink') {
          return "#F52E55"
     } else if (color === 'orange') {
          return "#F84D27"
     } else if (color === 'yellow') {
          return "#F3A203"
     } else if (color === 'green') {
          return "#11C844"
     } else if (color === 'aqua') {
          return "#02C09E"
     } else if (color === 'blue') {
          return "#02AADF"
     } else if (color === 'indigo') {
          return "#3B60BD"
     } else if (color === 'purple') {
          return "#6D45E1"
     }
}
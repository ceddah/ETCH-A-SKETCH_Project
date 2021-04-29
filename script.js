//DOM / Variables
const drawPad = document.getElementById('drawPad');
const pickColor = document.getElementById('pickColor');
const changeBGColor = document.getElementById('pickBgColor');
const randomColorBtn = document.getElementById('pickRandomColor');
const eraserBtn = document.getElementById('eraser');
const clearPadBtn = document.getElementById('clear-pad');
const changeSize = document.getElementById('pickSize');
const sizeEl = document.querySelector('.size-btn span');

const drawPadSize = drawPad.clientHeight;
let drawingColor = '#252627';
let rainbow = false;
let mouseDown = false;

//Functions
function init() {
    populatePad();
}

function populatePad(size = 4) {
    drawPad.innerHTML = '';
    for(let i = 1; i <= size * size; i++) {
        const pixel = document.createElement('div');
        pixel.style.width = `${drawPadSize / size}px`;
        pixel.style.height = `${drawPadSize / size}px`;
        pixel.setAttribute('draggable', false);
        drawPad.appendChild(pixel);
    }
    setBgColor();
    sizeEl.textContent = `Size: ${size} x ${size}`;
}

function setBgColor(color = '#FFF') {
    const pixels = drawPad.querySelectorAll('div');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = color;
    })
}

function startDrawing(e) {
    if(e.target.parentNode === drawPad && mouseDown) {
        const pixel = e.target;
        pixel.style.backgroundColor = drawingColor;

        if(rainbow) {
            getRandomColor();
        } 
    }
}

function getRandomColor() {
    drawingColor =  `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

//EventListeners
window.addEventListener('DOMContentLoaded', init);

pickColor.addEventListener('input', (e) => drawingColor = e.target.value)

changeBGColor.addEventListener('input', (e) => setBgColor(e.target.value))

clearPadBtn.addEventListener('click', () => setBgColor('#FFF'))

changeSize.addEventListener('change', (e) => populatePad(e.target.value))

changeSize.addEventListener('input', (e) => {
    sizeEl.textContent = `Size: ${e.target.value} x ${e.target.value}`;
})

randomColorBtn.addEventListener('click', () => {
    rainbow = !rainbow;
    randomColorBtn.classList.toggle('active');
})

eraserBtn.addEventListener('click', () => drawingColor = changeBGColor.value);

drawPad.addEventListener('mousedown', (e) => {
    mouseDown = true;
    startDrawing(e);
})

drawPad.addEventListener('mousemove', (e) => {
    startDrawing(e);
})

drawPad.addEventListener('mouseup', () => mouseDown = false);
drawPad.addEventListener('mouseleave', () => mouseDown = false);
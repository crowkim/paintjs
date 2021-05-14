const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const initialColor = '';
const canvasSize = 700;

canvas.width = canvasSize;
canvas.height = canvasSize;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvasSize, canvasSize);
ctx.strokeStyle = initialColor;
ctx.lineWidth = 2.5;
ctx.fillStyle = initialColor;

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChage(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "fill"
    } else {
        filling = true;
        mode.innerText = "paint"
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvasSize, canvasSize)
    }
}

function handleCM(event){
    event.preventDefault();
    console.log(event)
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = 'PaintJS[export]';
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}

if (colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))
}

if (range) {
    range.addEventListener("input", handleRangeChage)
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}

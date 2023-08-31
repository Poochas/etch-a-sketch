const gridSlider = document.getElementById('gridSize');
const gridSliderValue = document.getElementById('gridSliderValue');
const buttons = document.querySelectorAll('button');
const navigationButtons = document.querySelectorAll('#navigation button')
let mouseDown = false;
let activeButton = document.querySelector('.active');
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
generateGrid();
events();
gridSlider.oninput = function () {
    gridSize = this.value;
    gridSliderValue.innerText = `${gridSize}x${gridSize}`
    generateGrid(gridSize);
    events();
}

function generateGrid(columns = 16) {
    const frame = document.getElementById('frame')
    frame.innerHTML = ""
    for (let i = 0; i < columns; i++) {
        const row = document.createElement('div');
        let rowNum = `row${i + 1}`
        row.classList.add('row')
        row.setAttribute('id', rowNum)
        frame.appendChild(row);
        for (let i = 0; i < columns; i++) {
            let currentRow = document.getElementById(rowNum)
            const column = document.createElement('div');
            column.classList.add('column');
            column.style.backgroundColor = 'rgb(255, 255, 255)';
            currentRow.appendChild(column);
        }
    }
}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.currentTarget.id === 'clear') { reset() }
        else {
            e.currentTarget.classList.add('active');
            if ((activeButton != null && activeButton !== e.currentTarget)) {
                activeButton.classList.remove('active');
            }
            activeButton = e.currentTarget;
        }
    });
});

function events() {
    const boxes = document.querySelectorAll('.column');
    boxes.forEach((box) => {
        box.addEventListener('mousedown', paint)
        box.addEventListener('mouseover', paint)
    })
}

function paint(e) {
    let box = e.currentTarget
    if (e.type === 'mouseover' && !mouseDown) return
    let action = activeButton != null ? activeButton.id : null
    switch (action) {
        case 'paint':
            box.style.backgroundColor = 'rgb(0, 0, 0)';
            break;
        case 'erase':
            box.style.backgroundColor = 'rgb(255, 255, 255)';
            break;
        case 'rainbow':
            box.style.backgroundColor = randomColor();
            break;
        case 'lighten':
            box.style.backgroundColor = (lightenColor(box.style.backgroundColor))
            break;
        case 'darken':
            box.style.backgroundColor = (darkenColor(box.style.backgroundColor))
            break;
    }
}
function randomColor() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
}

function darkenColor(currentColor) {
    currentColor = currentColor.slice(currentColor.indexOf('(') + 1, currentColor.lastIndexOf(')')).split(', ')
    currentColor.forEach((e, index) => {
        if (e == 0) {
            currentColor[index] = 0
        } else if (e == 255) {
            currentColor[index] = parseInt(e) - 25.5
        } else {
            currentColor[index] = parseInt(e) - (parseInt(e) * 0.1)
        }
    });
    const newColor = `rgb(${currentColor.toString()})`;
    return newColor;
}
function lightenColor(currentColor) {
    currentColor = currentColor.slice(currentColor.indexOf('(') + 1, currentColor.lastIndexOf(')')).split(', ')
    currentColor.forEach((e, index) => {
        if (e == 0) {
            currentColor[index] = parseInt(e) + 25.5
        } else if (e == 255) {
            currentColor[index] = 255
        } else {
            currentColor[index] = parseInt(e) + (parseInt(e) * 0.1)
        }
    });
    const newColor = `rgb(${currentColor.toString()})`;
    return newColor;
}

function reset() {
    const boxes = document.querySelectorAll('.column');
    boxes.forEach((box) => {
        box.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    })
}
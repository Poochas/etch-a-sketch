const gridSlider = document.getElementById('gridSize');
const gridSliderValue = document.getElementById('gridSliderValue');
const buttons = document.querySelectorAll('.pencil');
let activeButton = null;
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
            column.style.backgroundColor = 'rgb(255,255,255)';
            currentRow.appendChild(column);
        }
    }
}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.currentTarget.classList.add('active');
        if ((activeButton != null && activeButton !== e.currentTarget)) {
            activeButton.classList.remove('active');
        }
        activeButton = e.currentTarget;
        // pencil
    });
});

function events() {
    const boxes = document.querySelectorAll('.column');
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            let action = activeButton != null ? activeButton.id : null
            switch (action) {
                case 'paint':
                    box.style.backgroundColor = 'rgb(0,0,0)';
                    break;
                case 'erase':
                    box.style.backgroundColor = 'rgb(255,255,255)';
                    break;
                case 'rainbow':
                    box.style.backgroundColor = randomColor();
                case 'lighten':
                    box.style.backgroundColor = (lightenColor(box.style.backgroundColor))
                case 'darken':
                    box.style.backgroundColor = (darkenColor(box.style.backgroundColor))
            }
        })

    })
}

function randomColor() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
}

function darkenColor(currentColor) {
    // console.log(currentColor.slice(4, -1))
    currentColor = currentColor.slice(4, -1).split(', ')
    // console.log(currentColor)
    currentColor.forEach((e, index) => {
        if (e == 0) {
            currentColor[index] = e
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
    // console.log(currentColor.slice(4, -1))
    currentColor = currentColor.slice(4, -1).split(', ')
    // console.log(currentColor)
    currentColor.forEach((e, index) => {
        if (e == 0) {
            currentColor[index] = parseInt(e) + 25.5
        } else if (e == 255) {
            currentColor[index] = e
        } else {
            currentColor[index] = parseInt(e) + (parseInt(e) * 0.1)
        }
    });
    const newColor = `rgb(${currentColor.toString()})`;
    return newColor;
}

// function pencil(action) {
//     switch (action)

// }
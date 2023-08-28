const gridSlider = document.getElementById('gridSize');
generateGrid('16');
gridSlider.oninput = function () {
    gridSize = this.value;
    generateGrid(gridSize);
}

function generateGrid(columns) {
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
            currentRow.appendChild(column);
        }
    }
}
// 

const boxes = document.querySelectorAll('.column');

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        box.classList.add('black')
    })
})


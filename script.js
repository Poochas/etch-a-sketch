function generateGrid(columns) {
    const frame = document.getElementById('frame')
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
generateGrid('16');

const boxes = document.querySelectorAll('.column');

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        box.classList.add('black')
    })
})


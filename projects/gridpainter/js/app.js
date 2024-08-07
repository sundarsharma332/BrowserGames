const blockSize = 20; // Adjust block size here
const grid = document.getElementById('grid');
const width = window.innerWidth;
const height = window.innerHeight;
const cols = Math.floor(width / blockSize);
const rows = Math.floor(height / blockSize);

function createGrid() {
    // Clear existing grid
    grid.innerHTML = '';

    // Set grid template based on calculated columns and rows
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    // Create grid items
    for (let i = 0; i < cols * rows; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        grid.appendChild(block);
    }
}

function getBlock(row, col) {
    return grid.children[row * cols + col];
}

const letters = {
    A: [[0, 1, 0], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1]],
    B: [[1, 1, 0], [1, 0, 1], [1, 1, 0], [1, 0, 1], [1, 1, 0]],
    C: [[0, 1, 1], [1, 0, 0], [1, 0, 0], [1, 0, 0], [0, 1, 1]],
    D: [[1, 1, 0], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 0]],
    E: [[1, 1, 1], [1, 0, 0], [1, 1, 0], [1, 0, 0], [1, 1, 1]],
    F: [[1, 1, 1], [1, 0, 0], [1, 1, 0], [1, 0, 0], [1, 0, 0]],
    G: [[0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 0, 1], [0, 1, 1]],
    H: [[1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1]],
    I: [[1, 1, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1]],
    J: [[1, 1, 1], [0, 0, 1], [0, 0, 1], [1, 0, 1], [1, 1, 1]],
    K: [[1, 0, 1], [1, 0, 1], [1, 1, 0], [1, 0, 1], [1, 0, 1]],
    L: [[1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 1, 1]],
    M: [[1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
    N: [[1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1]],
    O: [[0, 1, 0], [1, 0, 1], [1, 0, 1], [1, 0, 1], [0, 1, 0]],
    P: [[1, 1, 0], [1, 0, 1], [1, 1, 0], [1, 0, 0], [1, 0, 0]],
    Q: [[0, 1, 0], [1, 0, 1], [1, 0, 1], [1, 0, 1], [0, 1, 1]],
    R: [[1, 1, 0], [1, 0, 1], [1, 1, 0], [1, 0, 1], [1, 0, 1]],
    S: [[0, 1, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0]],
    T: [[1, 1, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]],
    U: [[1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]],
    V: [[1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [0, 1, 0]],
    W: [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 1, 1], [1, 1, 1, 1], [1, 0, 0, 1]],
    X: [[1, 0, 1], [1, 0, 1], [0, 1, 0], [1, 0, 1], [1, 0, 1]],
    Y: [[1, 0, 1], [1, 0, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0]],
    Z: [[1, 1, 1], [0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 1]]
};

function drawName() {
    const name = document.getElementById('nameInput').value.toUpperCase();
    if (name.length > 10) {
        alert("Please enter a name with a maximum of 10 characters.");
        return;
    }
    const startRow = Math.floor((rows - 5) / 2);
    const startCol = Math.floor((cols - (name.length * 4 - 1)) / 2);
    let col = startCol;

    for (let i = 0; i < name.length; i++) {
        const letter = letters[name[i]];
        if (letter) {
            for (let row = 0; row < letter.length; row++) {
                for (let c = 0; c < letter[row].length; c++) {
                    if (letter[row][c] === 1) {
                        const block = getBlock(startRow + row, col + c);
                        block.style.animation = 'rainbowFill 1.5s infinite';
                    }
                }
            }
            col += letter[0].length + 1; // Space between letters
        }
    }
}

function resetGrid() {
    const blocks = document.querySelectorAll('.grid .block');
    blocks.forEach(block => {
        block.style.animation = '';
        block.style.backgroundColor = '#e0e0e0';
    });
    document.getElementById('nameInput').value = '';
}

function toggleMode() {
    document.body.classList.toggle('dark');
}

// Initial grid creation
createGrid();

// Re-create grid on window resize
window.addEventListener('resize', createGrid);

const wrapper = document.querySelector('.wrapper')
const goButton = document.querySelector('.go')
const rangeSlider = document.getElementById('tiles-width')
const widthValue = document.getElementById('width')

let columns = Math.floor(document.body.clientWidth / 50)
let rows = Math.floor(document.body.clientHeight / 50)

const createTile = () => {
    const tile = document.createElement('div')
    tile.classList.add('tile')

    return tile
}

const createTiles = quantity => {
    for (let i = 0; i < quantity; i++) {
        wrapper.appendChild(createTile())
    }
}

const createGrid = (widthPerTile) => {
    widthValue.textContent = `${widthPerTile} px`
    wrapper.innerHTML = ""

    columns = Math.floor(document.body.clientWidth / widthPerTile)
    rows = Math.floor(document.body.clientHeight / widthPerTile)

    wrapper.style.setProperty('--columns', columns)
    wrapper.style.setProperty('--rows', rows)

    createTiles(columns * rows)
    createInitialPattern(columns)
}


const createInitialPattern = (columns) => {
    for(let i = 0; i < columns; i++) {
        const rand = Math.floor(Math.random() * 2)
        const tile = wrapper.childNodes.item(i)
        if (rand === 1) {
            tile.classList.add('blue')
        }
    }
}

const go = (columns) => {
    for (let i = columns + 1; i < rows * columns; i++) {
        const thisTile = wrapper.childNodes.item(i)
        const upLeftTile = wrapper.childNodes.item?.(i - columns - 1)
        const upTile = wrapper.childNodes.item?.(i - columns)
        const upRightTile = wrapper.childNodes.item?.(i - columns + 1)
        let blueTilesCount = 0
        if (i % columns === 0) {
            if (upTile.classList.contains('blue') || upRightTile.classList.contains('blue')) {
                thisTile.classList.add('blue')
            }
        }
        else {
            if (i % (columns - 1) === 0 && (upTile.classList.contains('blue') || upLeftTile.classList.contains('blue'))) {
                thisTile.classList.add('blue')
            } else {
                [upLeftTile, upTile, upRightTile].map((tile) => {
                    if (tile.classList.contains('blue')) {
                        blueTilesCount++;
                    }
                })
                if (blueTilesCount === 1 || blueTilesCount === 2) {
                    thisTile.classList.add('blue')
                }
            }
        }
    }
}

createGrid(50)

window.onresize = () => createGrid(rangeSlider.value)
goButton.onclick = () => go(columns)
rangeSlider.oninput = () => createGrid(rangeSlider.value)

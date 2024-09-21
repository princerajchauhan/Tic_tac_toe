
const boxes = document.querySelectorAll(".box")
const reset = document.querySelector("#reset")
const start = document.querySelector("#start")
const playerTurn = document.querySelector("#turn")
const winPlayer = document.querySelector("#winner")
const turnText = document.querySelector("#turnText")
const nameBtn = document.querySelector("#nameBtn")
const change = document.querySelector("#change")

let playerX;
let playerO;

const playerNames = () =>{
    playerX = document.querySelector("#playerx").value
    playerO = document.querySelector("#playero").value
    resetGame()
}

change.addEventListener("click", () =>{
    document.querySelector("#form").style.display = "block"
    document.querySelector("#form").style.display = "flex"
    playerNames()   
    console.log("clicked",playerO,playerX)
    
})

nameBtn.addEventListener("click", (e) => {
    e.preventDefault()
    playerNames()
    document.querySelector("#form").style.display = "none"
    console.log("clicked",playerO,playerX)
})

playerTurn.innerText = "X's"

let turn = true

function allDisabled(){
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].disabled = true
        boxes[i].style.backgroundColor = "grey"
    }
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if(turn){
            box.innerText = 'X'
            turn = false
            playerTurn.innerText = "O's"
        }
        else{
            box.innerText = 'O'
            turn = true
            playerTurn.innerText = "X's"
        }
        box.style.cursor = "default"  
        box.style.backgroundColor = "#c7c5c8"
        box.disabled = true

        if (checkWinner(box.innerText)) {
            playerTurn.innerText = `Winner - `
            playerTurn.classList.remove("shine")
            if (box.innerText === 'X') {
                turnText.innerHTML = `${playerX}`
            }else{
                turnText.innerHTML = `${playerO}`
            }
            // turnText.innerHTML = `Player${box.innerText}`
            turnText.classList.add("shine")
            allDisabled()
        }
        if (checkDraw() === 8) {
            playerTurn.textContent = "Match Draw"
            playerTurn.classList.remove("shine")
            turnText.innerText = ""
            turnText.classList.remove("shine")
        }
        
        
    })
})

const winner = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

const checkWinner = (e) =>{
    for(let win of winner){
        // console.log(win[0], win[1], win[2])
        // console.log(box[win[0]].innerText, box[win[1]].innerText, box[win[2]].innerText)
        if(boxes[win[0]].innerText === e && boxes[win[1]].innerText === e && boxes[win[2]].innerText === e){
            console.log("winner:",e)
            return true
        }
    }
    return false
}

const checkDraw = () =>{
    let count = 0;
    for (const win of winner) {
        if(boxes[win[0]].innerText !== '' && boxes[win[1]].innerText !== '' && boxes[win[2]].innerText !== '')
            count++
    }
    return count
}

reset.addEventListener("click", resetGame)
function resetGame(){
    playerTurn.innerText = 'X'
    for(let box of boxes){
        box.innerText = ""
        box.style.backgroundColor = "rgb(106 201 191)"
        box.disabled = false
    }
    playerTurn.innerText = "X's"
    playerTurn.classList.add("shine")
    turnText.innerHTML = ` - Turn`
    turnText.classList.remove("shine")
}

start.addEventListener("click", resetGame)

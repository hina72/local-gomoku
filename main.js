// handle input on change
var sizeInp = document.getElementById('size'),
    tme = document.getElementById('set-time');
sizeInp.oninput = () => {
    s = parseInt(sizeInp.value);
}
tme.oninput = () => {
    time = parseInt(tme.value);
}

// declare game variable
let time = parseInt(tme.value);
var s = parseInt(sizeInp.value),
    board = document.getElementsByClassName('board')[0],
    stt = document.getElementsByClassName('status')[0];

// the board and player move is stored in a 2D array (a)
var a, cur = 'X';

function createBoard(){
    a = [];
    //clear existing children
    board.replaceChildren();
    const frag = document.createDocumentFragment();
    for(let i = 0; i < s; i++){
        a[i] = [];
        for(let j = 0; j < s; j++){
            // unchecked cells' value = 0
            a[i][j] = 0;
            //create cells for the board
            const cell = document.createElement('div');
            cell.className = `cell ${i}-${j}`;
            cell.onclick = () => handleMove(i, j, cell);
            frag.appendChild(cell);
        }
    }
    board.appendChild(frag);
}
var scnt = document.getElementsByClassName('s-container')[0];
var moveIcon = [
    '\u2715',
    "O"
]
function handleMove(i, j, cell){
    // 
    if(a[i][j]){
        return;
    }

    // the current player is "O" if not "X"
    var player = moveIcon[cur == 'X' ? 0 : 1];
    // if X has made a move then it's O to go next
    cell.classList.add(cur == 'X' ? 'X' : 'O');
    // 1 is for X and 2 is for O
    a[i][j] = (cur == "X") ? 2 : 1;
    cur = (cur == "X") ? "O" : "X";

    scnt.classList.toggle('player-2');
    
    // add some attribute to the checked cell
    cell.classList.add(player);
    //var cellContent = document.createElement('span');
    //cellContent.className = 'material-symbols-outlined';
    //cellContent.innerText = player;
   // cell.appendChild(cellContent);

    cell.innerText = player;

    countDown(a[i][j] - 1);
    checkwin(i, j);

    Array.from(board.children).forEach(cel => {
        cel.classList.remove('last-move');
    });
    cell.classList.add('last-move');
}

function checkwin(i, j){
    // check for horizon and vertical direction\
    // the idea is to check only from the last move placed
    var ch = 0, cv = 0;
    var chmax = 0, cvmax = 0;
    
    // loop vertically and horizonly from the last move placed through the 2d array
    for(var k = 0; k < s; k++){
        if(a[k][j] == a[i][j]){
            cv++;
            if(cv == 5){
                gameOver(`${cur == "X" ? 1 : 0}`, 'getting 5 in a row');
        // add classname to highlight the winning position

                for(var t = 0; t < 5; t++){
                    document.getElementsByClassName(`${k - t}-${j}`)[0].classList.add('win');
                }
            }
        } else {
            cv = 0;
        }
        if(a[i][k] == a[i][j]){
            ch++;
            if(ch == 5){
                gameOver(`${cur == "X" ? 1 : 0}`, 'getting 5 in a row');

        // add classname to highlight the winning position
                for(var t = 0; t < 5; t++){
                    document.getElementsByClassName(`${i}-${k-t}`)[0].classList.add('win');
                }
            }
        } else {
            ch = 0;
        }
    }
    // check positive diagonal and negative diagonal
    checkd(i, j, 1, 1);
    checkd(i, j, 1, -1);
}

//function to check diagonal (neg and pos)
function checkd(pi, pj, d1, d2){
    var x = pi, y = pj, z = pi, t = pj, f = 1, b = 0;
    // go down 5 cell max
    for(var i = 0; i < 5; i++){
        x += d1;
        y += d2;
        // if the coordinate is outside of the board
        if(x >= s || y >= s) break;
        if(a[x][y] == a[pi][pj]){
            f++;
        } else {
            // if there is no more consecutive move placed
            break;
        }
    }
    //go up 5 cell max
    for(var i = 0; i < 5; i++){
        z -= d1;
        t -= d2;
        if(z < 0 || t < 0) break;
        if(a[z][t] == a[pi][pj]){
            b++;
        } else {
            // same as the above loop
            break;
        }
    }
    // if there is 5 consecutive, being more or less than that number shoudn't count
    if(f + b == 5){
        gameOver(`${cur == "X" ? 1 : 0}`, 'getting 5 in a row');
        // add classname to highlight the winning position
        for(var i = 0; i < 5; i++){
            z+= d1; t+= d2;
            document.getElementsByClassName(`${z}-${t}`)[0].classList.add('win');
        }
    }
    return f + b;
}


//var eltest = document.getElementsByClassName('el-test')[0];
var timer = document.getElementsByClassName('timer');
const cnt = [];


// counting down the 2 timer clock
function countDown(id){
    var tmp = id ? 0 : 1;
    clearInterval(cnt[tmp]);
    let sec = timer[id].innerText;
    // convert time in mm:ss to sec (if it is)
    var tEl = sec.split(':');
    if(tEl.length == 2){
        sec = parseInt(tEl[0]) * 60 + parseInt(tEl[1]);
    }
    cnt[id] = setInterval(() => {
        sec--;
        timer[id].innerText = btfTime(sec);
        if(sec <= 0){
            // in case a player run out of time
            gameOver(`${cur == "X" ? 1 : 0}`, `time out`);
            clearInterval(cnt[id]);
        }
    }, 1000);
}

// convert time in sec to mm:ss
function btfTime(sec){
    return `${addzero(Math.floor(sec / 60))}:${addzero(sec % 60)}`;
}
function addzero(num){
    if(Math.floor(num / 10) == 0){
        return '0' + num;
    } return num;
}


board.style.display = 'none';
var menu = document.getElementsByClassName('menu')[0],
    rbtn = document.getElementById('restart'),
    fter = document.getElementsByClassName('footer')[0];

function startGame(boardSize){
    a = [];
    cur = 'X';
    // hide/show some DOM when game start or restart
    scnt.classList.remove('player-2');
    fter.style.display = 'none';
    menu.style.display = 'none';
    stt.style.display = 'flex';
    rbtn.style.display = 'none';
    // board size as selected
    s = boardSize;
    board.style.gridTemplateColumns = `repeat(${boardSize}, 30px)`;
    board.style.gridTemplateRows = `repeat(${boardSize}, 30px)`;

    board.style.display = 'grid';
    clearInterval(cnt[0]);
    clearInterval(cnt[1]);
    timer[0].innerText = btfTime(time);
    timer[1].innerText = btfTime(time);
    createBoard();
    countDown(0);
}

// game over alert function
var altEl = document.getElementsByClassName('game-over')[0];
function alt(txt){
    altEl.innerText = txt;
    altEl.classList.add('appear');
}

var pname = [
    'Player X',
    'Player O'
];
var pnameclass = [
    'xwin',
    'owin'
];
//game over function
function gameOver(id, by){
    alt(`${pname[id]} won by ${by}!`);
    altEl.classList.add(pnameclass[id]);
    clearInterval(cnt[0]);
    clearInterval(cnt[1]);
    Array.from(board.children).forEach(cell => {
        cell.onclick = null;
    });

    rbtn.style.display = 'flex';
}


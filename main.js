var s = 15,
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
    
    
    
    console.log(a[i][j] - 1);
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
                alert(`${cur == "X" ? 'O' : "X"} wins!`);
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
                alert(`${cur == "X" ? 'O' : "X"} wins!`);
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
        alert(`${cur == "X" ? 'O' : "X"} wins!`);
        // add classname to highlight the winning position
        for(var i = 0; i < 5; i++){
            z+= d1; t+= d2;
            console.log(z, t);
            document.getElementsByClassName(`${z}-${t}`)[0].classList.add('win');
        }
    }
    return f + b;
}


//var eltest = document.getElementsByClassName('el-test')[0];
var timer = document.getElementsByClassName('timer');
const cnt = [];
let time = 300;

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
function startGame(){
    a = [];
    board.style.display = 'grid';
    clearInterval(cnt[0]);
    clearInterval(cnt[1]);
    timer[0].innerText = btfTime(time);
    timer[1].innerText = btfTime(time);
    createBoard();
    countDown(0);
}


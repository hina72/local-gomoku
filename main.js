var s = 15,
    board = document.getElementsByClassName('board')[0],
    stt = document.getElementsByClassName('status')[0];

// the board and player move is stored in a 2D array (a)
var a, cur = 'X';

function createBoard(){
    a = [];
    stt.innerText = (cur == 'X' ? "X" : "O") + " turn to move!";
    for(let i = 0; i < s; i++){
        a[i] = [];
        for(let j = 0; j < s; j++){
            // unchecked cells' value = 0
            a[i][j] = 0;
            //create cells for the board
            const cell = document.createElement('div');
            cell.className = `cell ${i}-${j}`;
            cell.onclick = () => handleMove(i, j, cell);
            board.appendChild(cell);
        }
    }
}
function handleMove(i, j, cell){
    // the current player is "O" if not "X"
    var player = (cur == 'X') ? "X" : 'O';
    // if X has made a move then it's O to go next
    cur = (cur == "X") ? "O" : "X";

    stt.classList.toggle('opponent');
    stt.innerHTML = cur + " turn to move!";
    
    // add some attribute to the checked cell
    cell.classList.add(player);
    cell.innerHTML = player;

    
    // 1 is for X and 2 is for O
    a[i][j] = (player == "X") ? 1 : 2;
    checkwin(i, j);
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

function checkd(pi, pj, d1, d2){
    var x = pi, y = pj, z = pi, t = pj, f = 1, b = 0;
    for(var i = 0; i < 5; i++){
        x += d1;
        y += d2;
        if(x >= s || y >= s) break;
        if(a[x][y] == a[pi][pj]){
            f++;
        } else {
            break;
        }
    }
    for(var i = 0; i < 5; i++){
        z -= d1;
        t -= d2;
        if(z < 0 || t < 0) break;
        if(a[z][t] == a[pi][pj]){
            b++;
        } else {
            break;
        }
    }
    if(f + b == 5){
        alert(`${cur == "X" ? 'O' : "X"} wins!`);
        for(var i = 0; i < 5; i++){
            z+= d1; t+= d2;
            console.log(z, t);
            document.getElementsByClassName(`${z}-${t}`)[0].classList.add('win');
        }
    }
    return f + b;
}
createBoard();

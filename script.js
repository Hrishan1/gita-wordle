const answer = WORDS[Math.floor(Math.random() * WORDS.length)];

const board = document.getElementById("board");
const message = document.getElementById("message");

let currentRow = 0;

for(let i=0;i<6;i++){

    const row=document.createElement("div");
    row.className="row";

    for(let j=0;j<5;j++){

        const tile=document.createElement("div");
        tile.className="tile";

        row.appendChild(tile);

    }

    board.appendChild(row);

}

function submitGuess(){

    const input=document.getElementById("guessInput");

    const guess=input.value.toLowerCase();

    if(guess.length!==5){

        message.innerHTML="Please enter exactly 5 letters.";

        return;

    }

    const tiles=board.children[currentRow].children;

    for(let i=0;i<5;i++){

        tiles[i].innerHTML=guess[i];

        if(guess[i]===answer[i]){

            tiles[i].classList.add("correct");

        }

        else if(answer.includes(guess[i])){

            tiles[i].classList.add("present");

        }

        else{

            tiles[i].classList.add("absent");

        }

    }

    if(guess===answer){

        message.innerHTML="🎉 Congratulations! You guessed the word!";

        return;

    }

    currentRow++;

    if(currentRow===6){

        message.innerHTML="Game Over! The word was <b>"+answer+"</b>";

    }

    input.value="";
}

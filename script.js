function buildHangmanGenerator (containerID){
  const container = document.getElementById(containerID);
        container.innerText = '';

  const hangman = document.createElement('div');
        hangman.setAttribute('target', 'hangmanGame');
        hangman.setAttribute('id', 'hangmanContainer');

        container.append(hangman);

      const title = document.createElement('p');
            title.setAttribute('target', 'hangmanGame');
            title.setAttribute('id', 'hangmanTitle');
            title.innerText = 'HANGMAN';

            hangman.append(title);

          const input = document.createElement('input');
                input.setAttribute('target', 'hangmanGame');
                input.setAttribute('id', 'hangmanInput');
                input.setAttribute('placeholder', 'Enter word');

                hangman.append(input);

          const buttonGenerate = document.createElement('button');
                buttonGenerate.setAttribute('onclick', 'generateHangman()');
                buttonGenerate.setAttribute('target', 'hangmanGame');
                buttonGenerate.setAttribute('id', 'hangmanButtonGenerate');
                buttonGenerate.innerText = 'Start game';

                hangman.append(buttonGenerate);

}

function generateHangman(){

  const hangman = document.getElementById('hangmanContainer');
        hangman.classList.add('blackBackground');
        hangman.innerText = '';

  const hangmanPassword = document.createElement('div');
        hangmanPassword.setAttribute('target', 'hangmanGame');
        hangmanPassword.setAttribute('id', 'hangmanPassword');

        hangman.append(hangmanPassword);

  const gameContent = document.createElement('div');
        gameContent.setAttribute('target', 'hangmanGame');
        gameContent.setAttribute('id', 'gameContent');

        hangman.append(gameContent);

      const hangmanImageContainer = document.createElement('div');
            hangmanImageContainer.setAttribute('target', 'hangmanGame');
            hangmanImageContainer.setAttribute('id', 'hangmanImageContainer');
            
            gameContent.append(hangmanImageContainer);

          const hangmanImage = document.createElement('img');
                hangmanImage.setAttribute('target', 'hangmanGame');
                hangmanImage.setAttribute('id', 'hangmanImage');
                hangmanImage.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNDun5A4cMkQdU8tHBHRmQLexETpTvutgW6w&usqp=CAU');
            
                hangmanImageContainer.append(hangmanImage);


      const hangmanBoard = document.createElement('div');
            hangmanBoard.setAttribute('target', 'hangmanGame');
            hangmanBoard.setAttribute('id', 'hangmanBoard');

            gameContent.append(hangmanBoard);

            generateBoard();

      const resetButton = document.createElement('button');
            resetButton.setAttribute('target', 'hangmanGame');
            resetButton.setAttribute('id', 'resetButton');
            resetButton.setAttribute('onclick', 'resetHangman()');
            resetButton.innerText = 'Reset';

            hangman.append(resetButton);

}

function generateBoard(){

    const hangmanBoard = document.getElementById('hangmanBoard');

    for (let i = 1; i <= 26; i++) {
		let keys = 64 + i;

      const letterButton = document.createElement('button');
            letterButton.setAttribute('target', 'hangmanGame');
            letterButton.classList.add('letter')
            letterButton.innerText = `${String.fromCharCode(keys)}`;

            hangmanBoard.append(letterButton);

	}
}

function resetHangman(){
    buildHangmanGenerator('container')
}

const Hangman = function (word, guess) {
    this.word = word.toLowerCase().split('');
    this.guess = guess;
    this.letters = [];
    this.puzzled = [];
}

Hangman.prototype.getPuzzle = function (){
    return this.word.map((letter)=>{
        if(letter === ' '){
            this.puzzled.push(letter)
        } else this.puzzled.push('_');
    })
}
Hangman.prototype.guessLetter = function (guessedLetter){
    let lettersIndex = [];
    if(this.letters.indexOf(guessedLetter) > 0){
        console.log('letter already checked!')
    } else {
    this.letters.push(guessedLetter);
    this.word.forEach((letter, index)=>{
        if(letter === guessedLetter) {lettersIndex.push(index)} 
    })}
    for(let i=0; i<lettersIndex.length; i++){
        this.puzzled.splice(lettersIndex[i], 1, guessedLetter);
    }
    console.log(this.puzzled);
}
const game1 = new Hangman ('cat', 3);
game1.getPuzzle('cat')
console.log(game1.guessLetter('a'))
console.log(game1.guessLetter('d'))
console.log(game1.guessLetter('c'))
console.log(game1.guessLetter('b'))
console.log(game1.guessLetter('t'))

window.onload = buildHangmanGenerator('container');
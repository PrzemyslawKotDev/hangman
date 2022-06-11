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

          const chancesBoard = document.createElement('div');
                chancesBoard.setAttribute('target', 'hangmanGame');
                chancesBoard.setAttribute('id', 'chancesBoard');

                hangman.append(chancesBoard);

              const chances4 = document.createElement('button');
                    chances4.setAttribute('onclick', 'generateHangman(4)');
                    chances4.setAttribute('target', 'hangmanGame');
                    chances4.classList.add('chancesButton');
                    chances4.innerText = '4 chances';

                    chancesBoard.append(chances4);

              const chances7 = document.createElement('button');
                    chances7.setAttribute('onclick', 'generateHangman(7)');
                    chances7.setAttribute('target', 'hangmanGame');
                    chances7.classList.add('chancesButton');
                    chances7.innerText = '7 chances';

                    chancesBoard.append(chances7);

              const chances10 = document.createElement('button');
                    chances10.setAttribute('onclick', 'generateHangman(10)');
                    chances10.setAttribute('target', 'hangmanGame');
                    chances10.classList.add('chancesButton');
                    chances10.innerText = '10 chances';

                    chancesBoard.append(chances10);

}
let hangmanInstance;
function generateHangman(chances){
    let regex = /^[A-Za-z\s]*$/;
    const password = document.getElementById('hangmanInput');
    if(regex.test(password.value)){

    hangmanInstance = new Hangman (password.value, chances);
    hangmanInstance.getPuzzle(password);

const hangman = document.getElementById('hangmanContainer');
      hangman.classList.add('blackBackground');
      hangman.innerText = '';

const hangmanPassword = document.createElement('div');
      hangmanPassword.setAttribute('target', 'hangmanGame');
      hangmanPassword.setAttribute('id', 'hangmanPassword');
      hangmanPassword.innerText = `${hangmanInstance.puzzled.join('')}`;

      hangman.append(hangmanPassword);

const gameContent = document.createElement('div');
      gameContent.setAttribute('target', 'hangmanGame');
      gameContent.setAttribute('id', 'gameContent');

      hangman.append(gameContent);

    const hangmanImageContainer = document.createElement('div');
          hangmanImageContainer.setAttribute('target', 'hangmanGame');
          hangmanImageContainer.setAttribute('id', 'hangmanImageContainer');
          
          gameContent.append(hangmanImageContainer);

        const hangmanImage = document.createElement('div');
              hangmanImage.setAttribute('target', 'hangmanGame');
              hangmanImage.setAttribute('id', 'hangmanImage');
              //hangmanImage.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNDun5A4cMkQdU8tHBHRmQLexETpTvutgW6w&usqp=CAU');
              hangmanImage.innerText = `${hangmanInstance.guess}`;
          
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
          resetButton.innerText = 'RESET';

          hangman.append(resetButton);

    } else {alert('Nieprawidłowe znaki!')}
}

function generateBoard(){

    const hangmanBoard = document.getElementById('hangmanBoard');

    for (let i = 1; i <= 26; i++) {
		let keys = 64 + i;
        let letter = String.fromCharCode(keys)

      const letterButton = document.createElement('button');
            letterButton.setAttribute('target', 'hangmanGame');
            letterButton.setAttribute('onclick', `checkLetter('${letter}')`);
            letterButton.classList.add('letter')
            letterButton.innerText = letter;

            hangmanBoard.append(letterButton);

	}
}

function resetHangman(){
    buildHangmanGenerator('container')
}

function checkLetter(letter){
    hangmanInstance.guessLetter(letter);
let hangmanPassword = document.getElementById('hangmanPassword');
    hangmanPassword.innerText = `${hangmanInstance.puzzled.join('')}`;
let hangmanImage = document.getElementById('hangmanImage');
    hangmanImage.innerText = `${hangmanInstance.guess}`;
}

const Hangman = function (word, guess) {
    this.word = word.toUpperCase().split('');
    this.guess = guess;
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
    this.word.forEach((letter, index)=>{
        if(letter === guessedLetter) {lettersIndex.push(index)}
    });
    if(lettersIndex.length < 1){
        this.guess = this.guess-1
    } else {
        for(let i=0; i<lettersIndex.length; i++){
            this.puzzled.splice(lettersIndex[i], 1, guessedLetter);
        }
    }
    if(this.puzzled.join('') === this.word.join('')) {
        setTimeout(()=>alert('WIN!'), 50)
    }
}

window.onload = buildHangmanGenerator('container');
function generateModule (){
    const container = document.getElementById('container');
          container.innerText = '';

    const hangman = document.createElement('div');
          hangman.setAttribute('target', 'hangmanGame');
          hangman.setAttribute('id', 'hangman');

          container.append(hangman);

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
        } else this.puzzled.push('*');
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

window.onload = generateModule();
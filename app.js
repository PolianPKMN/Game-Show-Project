const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.resetButton');
const phraseList = document.querySelector('#phrase ul');
const keyboard = document.querySelector('#letterKeys');
const heartArray = document.querySelectorAll('.try img');

let missed = 0;
let phrases = ['cry over spilt milk',
			   'lickety split',
			   'keep your shirt on',
			   'go for broke',
			   'on the ropes',
			   'a piece of cake',
			   'drawing a blank',
			 	 'keep your eyes peeled',
				 'jaws of death',
				 'roll with the punches',
			 	 'my cup of tea',
			   'raining cats and dogs',
			   'boy who cried wolf'];

startButton.addEventListener('click', () => {
	if (startButton.textContent === 'Start Game') {
		start();
		overlay.style.display = 'none';
	} else {
		reset();
		start();
		overlay.style.display = 'none';
	}
});

function getRandomPhraseAsArray(arr) {
	const randomNumber = Math.floor(Math.random() * arr.length);
	const randomPhrase = arr[randomNumber];
	const characters = randomPhrase.split('');
	return characters;
}

function addPhraseToDisplay(arr) {
	for (let i = 0; i < arr.length; i++) {
		const li = document.createElement('li');
		li.textContent = arr[i];
		phraseList.append(li);
		const letters = /^[0-9a-zA-Z]+$/;
		if (li.textContent.match(letters)) {
			li.className = 'letter';
		} else {
			li.className = '';
			li.style.margin = '1em';
		}
	}
}

keyboard.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const button = e.target;
		button.className = 'chosen';
		button.setAttribute('disabled', '');
		const letter = button.textContent;
		const letterFound = checkKey(letter);
		if (letterFound === null) {
			heartArray[missed].src = 'images/lostHeart.png';
			button.className = 'wrong';
			missed++;
		}
	}
	checkWin();

})

function checkLetter(letter) {
	const letters = document.querySelectorAll('.letter');
	let matchingLetter;
	let matchCounter = 0;
	for (let i = 0; i < letters.length; i++) {
		if (letter === letters[i].textContent) {
			letters[i].className += ' show';
			matchingLetter = letter;
			matchCounter++;
		}
	}



	if (matchCounter > 0) {
		return matchingLetter;
	} else {
		return null;
	}
}

function checkWin() {
	const totalLetters = document.querySelectorAll('.letter');
	const shownLetters = document.querySelectorAll('.show');
	const h3 = document.createElement('h3');
	if (shownLetters.length === totalLetters.length) {
		removeShow();
		overlay.className = 'win';
		overlay.style.display = 'flex';
		startButton.textContent = 'Go Again';
		overlay.appendChild(h3);
		h3.textContent = 'You Found the Secret Phrase!';
		showAnswerPhrase();
	} else if (missed >= 5) {
		removeShow();
		overlay.className = 'lose';
		overlay.style.display = 'flex';
		startButton.textContent = 'Start Over';
		overlay.appendChild(h3);
		h3.textContent = 'Darn, You Lost!';
		showAnswerPhrase();
	}
}

function removeShow() {
	for (let i = 0; i < phraseList.children.length; i++) {
		phraseList.children[i].classList.remove('show');
	}
}

function showAnswerPhrase() {
	const h4 = document.createElement('h4');
	h4.textContent = 'The answer was: ' + phraseList.textContent.toUpperCase();
	overlay.appendChild(h4);
}

function start() {
	const phraseArray = getRandomPhrase(phrases);
	displayPhrase(phraseArray);
}

function reset() {
	missed = 0;
	while (phraseList.firstChild) {
		phraseList.removeChild(phraseList.firstChild);
	}
	const h3 = document.querySelector('h3');
	h3.parentNode.removeChild(h3);
	const h4 = document.querySelector('h4');
	h4.parentNode.removeChild(h4);
	for (let i = 0; i < heartArray.length; i++) {
		heartArray[i].src = 'images/liveHeart.png';
	}
	const keyboardButton = document.querySelectorAll('#letterKeys button');
	for (let i = 0; i < keyboardButton.length; i++) {
		keyboardButton[i].classList.remove('chosen');
		keyboardButton[i].classList.remove('wrong');
		keyboardButton[i].removeAttribute('disabled');
	}
}

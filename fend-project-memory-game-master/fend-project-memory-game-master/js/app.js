/*
 * Create a list that holds all of your cards
 */
// Virables 
let deck = $(".deck"),
cardOpen= [],
stars = 3,
matchedCard = [],
counter = 0, 
seconds = 0,
minutes = 0,
timer = $(".timer"),
card = $(".card"),
restart = $(".restart");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Game Timer 
function gameTimer(){
	if(seconds == 60) {
		minutes = minutes + 1;
		seconds = 0;
	} else {
		seconds = seconds + 1;
}

$(".timer").html(minutes + ":" + seconds);
}

// this function to reset timer 
function resetTime(){
	
	clearInterval(timer);
	seconds = 0;
	minutes = 0;
	//$(".timer").html("0:00");
	timer = setInterval(gameTimer, 1000);

}
/* 
* shuffle the list of cards using the provided "shuffle" method from udacity
*/
function shuffleCards() {
	while(deck.firstChild)
		deck.removeChild(deck.firstChild)
	card = [...card];
	let cardList = shuffle(card);
	cardList.forEach(function(card) {
		deck.append(card);
	});
	resetTime();
}


// add initial stars
function addStars() {
	for (let i = 0; i < 3; i++) {
		$(".fa-star-o").attr("class", "fa fa-star");
	}
}

function updateCounterAndStars(){
	// update counter 
	$(".moves").html(counter);
	
	// add blank stars (decrese stars)
	if (counter == 16) {
		$("#star1").removeClass("fa-star").addClass("fa-star-o");
		stars = 2;
	} else if (counter == 20){
		$("#star2").removeClass("fa-star").addClass("fa-star-o");
		stars = 1;
	} else if (counter == 25) {
		$("#star3").removeClass("fa-star").addClass("fa-star-o");
		stars = 0;	
	}
	
};


// compare open card 
function compare(card){
	return !(card.hasClass("open show") || cardOpen.length==2 || card.hasClass("match"));
	
}



function resetOpen() {
	cardOpen.forEach(function(card) {
	card.toggleClass("open show");
	
});
cardOpen = [];
} 


// reset game to the default 
function resetGame() {
cardOpen = [];
matchedCard.forEach(function(card){
	card.toggleClass("match open");
	card.toggleClass("show");
});
matchedCard = [];
counter = 0;
resetTime();
updateCounterAndStars();
console.log(card);
shuffleCards();
addStars();
	
}

// show win modal when all cards matched
function modal() {
	swal({
		title: "Congratulations! You Won!",
		icon: "success",
		text: 'Number Of Moves:  ' + counter + "\n Number Of Stars: "+ stars + "\n Total Time: " + minutes + ":" + seconds,
		button: 'Play Again!',
		closeOnEsc: false,
		closeOnClickOutside: false
		}).then(function(value) {
			if (value) {
	resetGame();
			
		}
			});
}

function cardListeners() {
   if (compare( $(this))){
	  if (cardOpen.length === 0) {
	$(this).addClass("open show");
	cardOpen.push($(this));
	} else if (cardOpen.length === 1) {
		$(this).addClass("open show");
	cardOpen.push($(this));
	counter++;
	updateCounterAndStars();
	
	console.log("is it matched " + cardOpen[0].children().attr("class") + " SECOND" +cardOpen[1].children().attr("class"));
	// checks if the cardds are matched or not!
	if (cardOpen[0].children().attr("class") === cardOpen[1].children().attr("class")) {
  cardOpen.forEach(function(card) {
		card.addClass("match");
		matchedCard.push(card);
});
cardOpen = [];
// checks if all cards are matched the show the win modal
if (matchedCard.length == 16) {
		clearInterval(timer);
	modal();
	} 
	
		}else {
		setTimeout (function() {
		resetOpen();
		}, 700);
	}
		
	}
	}

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
card.click(cardListeners);
restart.click(resetGame);
$(shuffleCards);
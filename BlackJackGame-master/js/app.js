// h for heart, s for spade, d for diamond, c for club
var deck = ["AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "KH", "QH", "JH",
            "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "KS", "QS", "JS",
            "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "KD", "QD", "JD",
            "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "KC", "QC", "JC"]



var temp;                     // it will be storing the value of first card of dealer
var deal;                     // deal amount
var playerIndex = 0;          // players index
var dealerIndex = 0;          // dealers index
var playerScore = 0;          // player score
var dealerScore = 0;          //dealer score


// drawing a random card
function drawRandomCard(deck, isPlayer, index){
    var randomIndex = Math.floor(deck.length * Math.random());   // chosing any card from the deck
    var val = deck[randomIndex];
    deck.pop(val);                                               //removing that card from the deck
    var ind = val[0];
    if(val[0] == 1){
        ind = 10;
    }
    var score  = ind;
    if(val[0] == '1' || val[0] == 'Q' || val[0] == 'J' || val[0] == 'K'){
        score = 10;
    }
    else if(val[0] == 'A'){
        score = 11;
    }
    score = parseInt(score);
    if(isPlayer){                 // dealing with players 
        //displaying the card
        document.getElementById("p" + index).innerHTML = "<section class = 'wow bounceInUp face-image'><img src='./faces/"+val+ ".png' alt='Cards back'></section>";
        playerScore += score;              // increamenting the players score
        //displaying the players score
        document.getElementById("pScore").innerHTML = "Player (score : "+playerScore+")";
    }else{                       //dealing with dealer
        if(index == 1){
            temp = val;
            //displaying the back side of card for the first card wihdrawn by dealer
            document.getElementById("d" + index).innerHTML = "<section class = 'wow bounceInUp face-image' ><img src='./faces/red_back.png' alt='Cards back'></section>";
        }
        else{
            dealerScore+=score;    //incrementing the dealers score
            //displaying card
            document.getElementById("d" + index).innerHTML = "<section class = ' wow bounceInUp face-image'><img src='./faces/"+val+ ".png' alt='Cards back'></section>";
            // displaying dealers score
            document.getElementById("dScore").innerHTML = "Dealer (score : "+dealerScore+")";
        }
    }
    return;
}


//displaying the front view of the first card withdrawn by dealer
function displayfront(){
    var val = temp;
    var res = val.slice(-1);
    var ind = val[0];
    if(val[0] == 1){
        ind = 10;
    }
    var score  = ind;
    if(val[0] == '1' || val[0] == 'Q' || val[0] == 'J' || val[0] == 'K'){
        score = 10;
    }
    else if(val[0] == 'A'){
        score = 11;
    }
    score = parseInt(score);
    dealerScore+=score;                  //increamenting the dealers score
    //displaying the card
    document.getElementById("d1").innerHTML = "<section class = 'face-image wow bounceInUp'><img src='./faces/"+val+ ".png' alt='Cards back'></section>";
    //displaying the dealer score
    document.getElementById("dScore").innerHTML = "Dealer (score : "+dealerScore+")";
    return;
}

//starting the game by picking two cards each for players and dealers
function startGame(){
    drawRandomCard(deck,true,++playerIndex);
    drawRandomCard(deck,true,++playerIndex);
    drawRandomCard(deck,false,++dealerIndex);
    drawRandomCard(deck,false,++dealerIndex);
    return;
}

// on reload of window, disabling the button which is not required and enabling the required one
function start(){
    document.getElementById("start").disabled = true;
    deal = document.getElementById("deal").value;
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;
    document.getElementById("deal").disabled = true;
    document.getElementById("newgame").disabled = true;
    startGame();
}


//reloading the window after a game is completed
function reload(){
    location.reload();
}


// on starting a new game, disabling the button which is not required and enabling the required one
function newGame(){
    document.getElementById("start").disabled = true;
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("deal").disabled = true;
    document.getElementById("newgame").disabled = false;
}


//getting a random card by dealer
function getCard(){
    var randomIndex = Math.floor(deck.length * Math.random());
    var val = deck[randomIndex];
    deck.pop(val);
    var res = val.slice(-1);
    var ind = val[0];
    if(val[0] == 1){
        ind = 10;
    }
    var score  = ind;
    if(val[0] == '1' || val[0] == 'Q' || val[0] == 'J' || val[0] == 'K'){
        score = 10;
    }
    else if(val[0] == 'A'){
        score = 11;
    }
    score = parseInt(score);
    dealerScore+=score;
    document.getElementById("d" + ++dealerIndex).innerHTML = "<section class = 'face-image wow bounceInUp'><img src='./faces/"+val+ ".png' alt='Cards back'></section>";
    document.getElementById("dScore").innerHTML = "Dealer (score : "+dealerScore+")";
    dealer();
}

// when hit is clicked a card will be picked by player
function hit(){
    drawRandomCard(deck,true,++playerIndex);
    if(playerScore == 21){
        displayfront();
        document.getElementById("output").innerHTML = "player score is "+ playerScore + ", Dealer Score is " + dealerScore +", you have won $"+deal +".";
        newGame();
    }
    else if(playerScore > 21){
        displayfront();
        document.getElementById("output").innerHTML = "player score is "+ playerScore + ", Dealer Score is " + dealerScore +", dealer won. You have lost $" + deal +".";
        newGame();
    }
}

//picking card for dealer
function dealer(){
    if(dealerScore  == 21){
        document.getElementById("output").innerHTML = "player score is "+ playerScore + ", Dealer Score is " + dealerScore +", dealer won. You have lost $" + deal +".";
        newGame();
    }
    else if(dealerScore > 21){
        document.getElementById("output").innerHTML = "player score is "+ playerScore + ", Dealer Score is " + dealerScore +", you have won $"+deal +".";
        newGame();
    }
    else{
        if(dealerScore > playerScore){
            document.getElementById("output").innerHTML = "player score is "+ playerScore + ", Dealer Score is " + dealerScore +", dealer won. You have lost $" + deal +".";
            newGame();
        }
        else{
            getCard();
        }
    }
}

//on clicking stand button
function stand(){
    displayfront();  //it will display the front face
    getCard();       // pick one card
    dealer();       
}


//Store players and start game from model
player1 = {
    player: "",
    score: 0
}

player2 = {
    player: "",
    score: 0
}


$('#start-game').click(function(){
        $('.model-container').toggleClass('hidden')
        player1.player = $('#inpplayer1name').val()
        player2.player = $('#inpplayer2name').val()
        $('#player1name').text(player1.player)
        $('#player2name').text(player2.player)
        $('.main-content').toggleClass('hidden')
    }
)




$('#player1score').text("Score: " + player1.score)
$('#player2score').text("Score: " + player2.score)

currentplayer = player1

//Store flipped cards
var flipped = []

//Randomly assign card identifiers to table cells and place face down

shuffleIds = (ids) => {
    for (var i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = ids[i];
      ids[i] = ids[j];
      ids[j] = temp;
    }
  }

ids = Array.from(Array(54).keys())
//shuffleIds(ids)

var cards = $('table tr').find('td')

for (var i = 0; i < cards.length; i++){
    cards.eq(i).attr('id', ids[i])
    cards.eq(i).css({'background-image':`url(\'Assets/${cards.eq(i).attr('id')}.svg\')`})
}

//Check if match
function checkMatch(){
    high = Math.max(flipped[0],flipped[1])
    low = Math.min(flipped[0],flipped[1])
    highcard = $(`#${high}`)
    lowcard = $(`#${low}`)
    setTimeout(() => {
        if ((high === 53 && low === 52) || (((high < 26) || (low > 25)) && (high - low === 13))){
            currentplayer.score += 1
            highcard.toggleClass('hidden')
            lowcard.toggleClass('hidden')
        }
        highcard.toggleClass('down')
        lowcard.toggleClass('down')
        $('#player1score').text("Score: " + player1.score)
        $('#player2score').text("Score: " + player2.score)
        flipped.length = 0
        $('.playerturn').toggleClass('hidden')
        $('.playerturn').toggleClass('white')
        switch (currentplayer) {
            case player1:
                currentplayer = player2
                break;
            case player2:
                currentplayer = player1
                break;
            default:
                break;
        }
    }
    , 1500);


}

//Game Logic on Click
cards.click(function(){
    if (flipped.length < 2){
    $(this).toggleClass("down")
    flipped.push(parseInt($(this).attr('id')))
        if (flipped.length === 2){
            checkMatch()
        }
    }

})


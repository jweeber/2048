var Game = function() {
  // Game logic and initialization here

  this.container = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

}

// Game.prototype.boardState = function() {
//   // go through current container objects and make an array of used coordinates ([row, col])
//   var array = []
//   for (var tile in this.container) {
//     // console.log(this.container[tile].val + "this continer tile")   
//     if (this.container[tile].val === undefined) {   
//     console.log("hallo?")
//     array.push([this.container[tile].row, this.container[tile].col])
//     }
//   }
//   console.log(array + " = BOARDSTATE ARRAY")
//   return array
// }

Game.prototype.newTile = function () {
    // get random col and row 
    var rando_col = Math.floor(Math.random() * (4 - 0) + 0)
    var rando_row = Math.floor(Math.random() * (4 - 0) + 0)
    var val = 2
    if (this.container[rando_row][rando_col] === 0) {
    this.container[rando_row][rando_col] = val
    } else {
      this.newTile()
    }
    // get div id

    var id = (rando_row * 4) + rando_col
    // update div info
    var tileQ = $('#' + id)
    tileQ.attr('data-val', val)
    tileQ.text(val)
}

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up')
      this.buildUpArray()
      // this.newTile()
      break
    case 40: //down
      console.log('down')
      break
    case 37: //left
      // console.log('left')
      this.buildLeftArray()
      break
    case 39: //right
      console.log('right')
      break
  }
}

Game.prototype.buildLeftArray = function () {
  this.container = this.shiftArrays(this.container)
  console.log(this.container)
}

Game.prototype.shiftArrays = function (arrays) {
  for (var row of arrays) {
    for (let i = 0; i < (row.length - 1); i++) {
      if ((row[i] === row[i + 1]) && (row[i] !== 0)) {
        row[i] = row[i] * 2
        row[i + 1] = 0
      } else if (row[i] == 0) {
        row.shift()
        row.push(0)
      }
    }  
  }
  return arrays
}

$(document).ready(function() {
  console.log("ready to go!")
  // Any interactive jQuery functionality

  function newGame() {
    game = new Game()
    game.newTile()
    game.newTile()
  }

  newGame()

  $('.new-game').on('click', function(event) {
    $('.tile').text('')
    $('.tile').css('background', 'rgba(238, 228, 218, 0.35)')
    newGame()
  })

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40]
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile')
      
      game.moveTile(tile, event.which)
    }
  })


})

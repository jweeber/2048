var Game = function() {
  // Game logic and initialization here

  this.container = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
  ]
  // [
  //   0, 1, 2, 3,
  //   0, 1, 2, 3,
  //   0, 1, 2, 3,
  //   0, 1, 2, 3
  // ]
}

Game.prototype.updateBoard = function() {
  for (let i = 0; i < 16; i++) {
    var tileQ = $('#' + i)
    if (this.container[i] != 0) {
      tileQ.attr('data-val', this.container[i])
      tileQ.text(this.container[i])
    } else {
      tileQ.attr('data-val', 0)
      tileQ.text("")
    }
  }
}

Game.prototype.newTile = function () {
  var val = 2

  // generate new random cell while condition is true
  var random_cell
  do {
    random_cell = Math.floor(Math.random() * 16)
  } while (this.container[random_cell] != 0)

  // update container
  this.container[random_cell] = val

  // update div info
  var tileQ = $('#' + random_cell)
  tileQ.attr('data-val', val)
  tileQ.text(val)
}

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
    console.log("UP")
      this.buildUpArray()
      break
    case 40: //down
      console.log('down')
      break
    case 37: //left
      this.buildLeftArray()
      break
    case 39: //right
      this.buildRightArray()
      break
  }
}

Game.prototype.buildUpArray = function () {
  // empty container for shifted rows
  var up_arrays = this.container

  for (let i = 0; i < 4; i++) {    
    // blank array to hold elements 
    var up_a = [];
    // iterate through container 4 times to build transposed arrays
    for (let j = 0; j < 4; j++) {
      up_a[j] = this.container[j * 4 + i];

      // when array is constructed pass to shiftRow function to shift
      if (up_a.length === 4) {
        // console.log("a" + temp_a)
        var up_b = this.shiftRow(up_a);
        console.log("b" + up_b)

        // put row elements back in container
        for (let k = 0; k < 4; k++) {
          up_arrays[k * 4 + i] = up_b[k]
        }
      }
    }
    this.container = up_arrays
  }
  this.updateBoard()
  this.newTile()
}

Game.prototype.buildLeftArray = function () {
  // create and feed correct arrays from this.container
  for (let i = 0; i < 4; i++) {    
    var a = this.container.slice(i*4, i*4+4);

    // update to be similiar to loop below to update container to make work on cols
    var b = this.shiftRow(a)

    // update this.container
    for (let j = 0; j < 4; j++) {
      this.container[i * 4 + j] = b[j]
    }
  }
  this.updateBoard()
  this.newTile()
}

Game.prototype.buildRightArray = function () {
  // create and feed correct arrays from this.container
  for (let i = 0; i < 4; i++) {    
    // get row to shift
    // update to be similiar to loop below to update container to make work on cols
    var a = this.container.slice(i*4, i*4+4)
    // reverse arrays before sending to shift
    a = a.reverse()
    var b = this.shiftRow(a)
    // reverse back before sending back to container
    b = b.reverse()

    // update this.container
    for (let j = 0; j < 4; j++) {
      this.container[i * 4 + j] = b[j]
    }
  }
  this.updateBoard()
  this.newTile()
}

Game.prototype.shiftRow = function(row) {
  var shifted = [];
  var can_merge = true;

  // shift elements in a row to the left
  for (var el of row) {
    if (!el) {
      // always collapse zeros
      continue;
    }

    if (can_merge &&
        // ensure there is something valid to merge with
        shifted.length && shifted[shifted.length-1] === el) {
      shifted[shifted.length-1] *= 2;
      can_merge = false;
    } else {
      shifted.push(el);
      can_merge = true;
    }
  }

  // pad array with zeros
  while (shifted.length < row.length) {
    shifted.push(0);
  }

  return shifted;
}

$(document).ready(function() {
  console.log("ready to go!")

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

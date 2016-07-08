var Game = function() {
  // object that represents board state
  this.container = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
    ]
  this.score = 0
}

Game.prototype.updateBoard = function() {
  // if board is close to a lose, check for total loss
  if (this.container.includes(0) === false) {
    this.checkAllLose()
  }

  // iterate container and update new board state
  for (let i = 0; i < 16; i++) {
    var tileQ = $('#' + i)

    if (this.container[i] != 0) {
      tileQ.attr('data-val', this.container[i])
      if ((tileQ).data('val') === 2048) { $('.win-lose').text('2048! Used the Force!') }
    } else {
      tileQ.attr('data-val', 0)
      tileQ.text("")
    }
  }
}

Game.prototype.newTile = function () {
  // first value
 var val = 2

  // generate new random cell while condition is true
  var random_cell;
  if (this.container.includes(0) === true) {
    do {
      random_cell = Math.floor(Math.random() * 16)
    } while (this.container[random_cell] != 0)
  }

  // update container
  this.container[random_cell] = val

  // update div info
  var tileQ = $('#' + random_cell)
  tileQ.attr('data-val', val)
}

Game.prototype.moveTile = function(tile, direction) {
  switch(direction) {
    case 38: //up
    this.buildUpArray()
    break
    case 40: //down
    this.buildDownArray()
    break
    case 37: //left
    this.buildLeftArray()
    break
    case 39: //right
    this.buildRightArray()
    break
  }
}

Game.prototype.buildDownArray = function () {
  for (let col = 0; col < 4; col++) {
    var a = [];
    // build transposed array from container
    for (let row = 0; row < 4; row++) {
      a[row] = this.container[(3 - row) * 4 + col]
    }

    // send to function to shift
    var b = this.shiftRow(a)

    // re-transpose and send back to container
    for (let row = 0; row < 4; row++) {
      this.container[(3 - row) * 4 + col] = b[row]
    }
  }
  this.updateBoard()
  this.newTile()
}

Game.prototype.buildUpArray = function () {
  for (let col = 0; col < 4; col++) {
    var a = [];
    // build transposed array from container
    for (let row = 0; row < 4; row++) {
      a[row] = this.container[row * 4 + col];
    }

    // send to function to shift
    var b = this.shiftRow(a)

    // re-transpose and send back to container
    for (let row = 0; row < 4; row++) {
      this.container[row * 4 + col] = b[row]
    }
  }

  console.log(this.container)

  this.updateBoard(), 1000
  this.newTile()
}

Game.prototype.buildLeftArray = function () {
  for (let row = 0; row < 4; row++) {
    var a = [];
    // build transposed array from container
    for (let col = 0; col < 4; col++) {
      a[col] = this.container[row * 4 + col]
    }

    // send to function to shift
    var b = this.shiftRow(a)

    // re-transpose and send back to container
    for (let col = 0; col < 4; col++) {
      this.container[row * 4 + col] = b[col]
    }
  }
  this.updateBoard()
  this.newTile()
}

Game.prototype.buildRightArray = function () {
  for (let row = 0; row < 4; row++) {
    var a = [];
    // build transposed array from container
    for (let col = 0; col < 4; col++) {
      a[col] = this.container[row * 4 + (3 - col)]
    }

    // send to function to shift
    var b = this.shiftRow(a)

    // re-transpose and send back to container
    for (let col = 0; col < 4; col++) {
      this.container[row * 4 + (3 - col)] = b[col]
    }
  }
  this.updateBoard()
  this.newTile()
}

Game.prototype.shiftRow = function(row) {
  var shifted = []
  var can_merge = true

  // shift elements in a row to the left
  for (var el of row) {
    if (!el) {
      // always collapse zeros
      continue;
    }

    if (can_merge &&
        // ensure there is something valid to merge with
        shifted.length && shifted[shifted.length-1] === el) {
      var points = shifted[shifted.length-1] *= 2;
    this.score += points
    $('.points').text(this.score)
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


Game.prototype.checkAllLose = function() {
  var lost = 0
  // check that up/down are lost
  for (let col = 0; col < 4; col++) {
    var a = [];
    // build row from container
    for (let row = 0; row < 4; row++) {
      a[row] = this.container[row * 4 + col];
    }

    // check if row is lost
    var b = this.checkLose(a)
    // if lost, interate total losses
    if (!b) {
      lost += 1
    }
  }

  // check left/right are lost
  for (let row = 0; row < 4; row++) {
    var a = [];
    // build row from container
    for (let col = 0; col < 4; col++) {
      a[col] = this.container[row * 4 + (3 - col)]
    }

    // check if row is lost
    var b = this.checkLose(a)
    // if lost, interate total losses
    if (!b) {
      lost += 1
    }
  }

  // check if all rows/cols are lost
  if (lost === 8) {
    $('.win-lose').html('These are not the droids <p> you are looking for,</p><p> move along. (You lose)</p>')
  }
}

Game.prototype.checkLose = function(array) {
  // check that there is no zeros
  if (array.includes(0)) {
    return false
  }

  // check that nothing can be collapsed
  var prev = 0
  for (var li of array) {
    if (li === prev) {
      return true
    }
    prev = li
  }
  return false
}



// track changes for css movements
// CONCEPT CODE, CURRENTLY NOT IN USE
// if we want to expand we need to keep all these change objects
// then apply css to them to convey movement and effect for collision
Game.prototype.trackChange = function(prev_array, current_array) {
  var p_a = prev_array
  var c_a = current_array

  for (var i = 3; i >= 0; i--) {
    if (p_a[i] === 0) {
      p_a.pop()
    }

    if (c_a[i] === 0) {
      c_a.pop()
    }
  }

  // track farthest MOVE of a tile toward the front and collisions
  var total_movement = [c_a.length-1, p_a.length-1]

  // find collision index(s) 
  var collision_index = []
  for (var i = 1; i < 3;) {
    if (prev_array[i] === prev_array[i-1]) {
      collision_index.push(prev_array[i-1])
      i += 2
    }
    i++
  }

  // return object with movements array and collisions array
  return {
    'movements': total_movement,
    'collisions': collision_index
  }
}


$(document).ready(function() {
  function newGame() {
    game = new Game()
    game.newTile()
    game.newTile()
  }

  newGame()

  $('.new-game').on('click', function(event) {
    $('.tile').text('')
    $('.tile').attr('data-val', "0")
    $('.points').text('0')
    $('.win-lose').text('')
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

myAudio = new Audio('star-wars-theme-song.mp3'); 
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();
var Game = function() {
  // Game logic and initialization here
  var board = { }
  //   'container': {}
  //   'row':
  //   'column': 
  //   'data':
};

Game.prototype.newTile = function (slots) {
  

}

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      break;
    case 40: //down
      console.log('down');
      break;
    case 37: //left
      console.log('left');
      break;
    case 39: //right
      console.log('right');
      break;
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('.new-game').on('click', function(event) {
    $('.tile').text('')
    $('.tile').css('background', 'rgba(238, 228, 218, 0.35)')
    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  })

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      
      game.moveTile(tile, event.which);
    }
  });
});

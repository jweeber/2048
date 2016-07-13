##Finished App: http://star-wars-2048.herokuapp.com/

# 2048
For this project, we will be working in pairs to create a clone of the super-fun browser based game [2048](http://gabrielecirulli.github.io/2048/).

You will not use or reference of of the code or assets in the original or any clones, forks, remakes, extensions, or modifications of 2048. This one is yours. Own it.

This repo provides a bare minimum of markup, styles, and javascript. It's enough to get you going, but it's likely that your implementation will require significant extension and modification of the provided assets.

## Project Deliverables
Recreate as much of the original game as is reasonable in the one week we have alotted for this project. Focus on completing and delivering individual chunks of functionality. This is an ambitious project, so allocate your time wisely and focus on understanding the _how_ and _why_ of the code you write.

### Learning Goals
- Organzizing JavaScript functionality into maintainable objects.
- Exploring how HTML, CSS, and JavaScript work together to create a memorable user experience.
- Defining units of work--individually deliverable components--that can be ordered, scoped, and scheduled.
- Make things zoom around a grid with math and stuff.

### Project Baseline
- Play a couple games of [2048](http://gabrielecirulli.github.io/2048/). Think about everything that's likely happening in the code to support what's happening on the screen. Once you've got a feel for the game, talk with your pair and answer the following questions:
  1. How does scoring work? the sum of the tiles that collide
  1. When do tiles enter the game? 2 at the beginning (either 2 or four) on random spots on the board, after that one 2 pops up in a random spot on the board.
  1. How do you know if you've won? you get 2048 on one tile
  1. How do you know if you've lost? the grid is full
  1. What makes tiles move? all arrow keys
  1. What happens when they move? all the tiles move as far to the direction of the arrow key as possible, if there is a tile match, they collide into one
  1. How would you know how far a tile should move? to the farthest open space unless the nearest tile is a match
  1. How would you know if tiles would collide? if they are the same number
  1. What happens when tiles collide? they add to each other and the score increases by the sum of the two tiles
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.

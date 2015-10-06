import React from 'react';

import GameBoard from './components/GameBoard';

// Game constants
const NUMBER_BUTTONS = 3;
const NUMBER_MOVES = 5;

// Get game logic model
import GameLogic from './model/gamelogic';
let gameLogic = new GameLogic(NUMBER_BUTTONS, NUMBER_MOVES);

let App = React.createClass({

  render: function() {
    return (
      <GameBoard
        gameLogic={gameLogic}
        numberOfButtons={NUMBER_BUTTONS}
        steps={gameLogic.steps}
        />
    );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);

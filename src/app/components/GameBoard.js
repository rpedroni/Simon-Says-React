import React from 'react';

import ButtonAndLED from './ButtonAndLED';

/****** TIME CONSTANTS ******/
const STEP_TIME = 450; // Time between each step
const STEP_OFF_TIME = 150; // Time between each step off
const MOVE_TIME = 750; // Time before a new move

let GameBoard = React.createClass({

  propTypes: {
    gameLogic: React.PropTypes.object.isRequired,
    numberOfButtons: React.PropTypes.number.isRequired,
    steps: React.PropTypes.array.isRequired,
  },

  getInitialState: function() {
    return {
      message: '',
      enableInput: false,
      ledOn: new Array(this.props.numberOfButtons).fill(false),
    };
  },

  // componentWillUpdate: function(nextProps, nextState) {
  //   console.log(nextState.ledOn);
  // },

  componentDidMount: function() {
    // Signal game started
    this.props.gameLogic.startGameWithCallbacks({
      displaySteps: this.displayMoveSteps,
      win: this.win,
      lose: this.lose
    });
  },
  componentWillUnmount: function() {
    //this.props.gameLogic.unregisterCallback();
  },

  // TODO
  win() {
    console.log('Win!');
  },
  lose() {
    console.log('Lose!');
  },

  // Without Flux, this is the only way the model can talk to the component
  // without severe coupling
  displayMoveSteps(steps) {
    // Disable user input
    this.setState({ enableInput: false });
    // Wait for MOVE_TIME
    setTimeout(this._displaySteps.bind(this, steps), MOVE_TIME);
  },
  _displaySteps(steps) {
    let ledOn = this.state.ledOn;
    ledOn[steps[0]] = true;
    this.setState({ ledOn });
    setTimeout(this._turnOff.bind(this, steps), STEP_TIME);
  },
  _turnOff(steps) {
    let ledOn = this.state.ledOn;
    ledOn[steps[0]] = false;
    this.setState({ ledOn });
    let [,...newSteps] = steps;
    if (newSteps.length > 0) {
      setTimeout(this._displaySteps.bind(this, newSteps), STEP_OFF_TIME);
    } else {
      this.setState({ enableInput: true });
    }
  },

  inputControl(i) {
    // Signal game logic of user input press
    this.props.gameLogic.inputControl(i);
  },

  render: function() {

    let styles = {
      border: '2px solid black', padding: 10, borderRadius: 10
    };

    // Game message
    let message =
    <div>
      <h4>Moves</h4>
      <span>To Win: {this.props.gameLogic.numberOfMoves}</span><br/>
      <span>Remaining: {this.props.gameLogic.numberOfMoves - this.props.gameLogic.moveCount + 1}</span><br/><br/>
    </div>

    // Game buttons and leds
    let inputs = [];
    for (let i = 0; i < this.props.numberOfButtons; i++)
      inputs.push(
        <ButtonAndLED
          key={i}
          enabled={this.state.enableInput}
          ledOn={this.state.ledOn[i]}
          cb={this.inputControl.bind(this, i)} />
      );

    return (
      <div style={styles}>
        {/* message board */}
        {message}
        {/* dynamic input buttons/leds */}
        {inputs}
      </div>
    );
  }

});

export default GameBoard;

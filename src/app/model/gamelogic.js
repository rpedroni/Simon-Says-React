
class GameLogic {

  constructor(numButtons = 5, numMoves = 0) {
    this.numberOfButtons = numButtons;
    this.numberOfMoves = numMoves;
    this.stepCheckIndex = 0;
    this.steps = [];
    // Callbacks to "talk" to board
    this.callbacks = {};
  }


  startGameWithCallbacks(cbs) {
    ({ displaySteps: this.callbacks.displaySteps, win: this.callbacks.win, lose: this.callbacks.lose } = cbs);
    this.newMove();
  }
  newMove() {
    this.steps.push(this._generateRandomStep());
    this.callbacks.displaySteps(this.steps);
  }

  // Get user's input
  inputControl(input) {
    // Check equality
    if (this.steps[this.stepCheckIndex] === input) {
      // Correct!
      // Update for next index
      this.stepCheckIndex++;
      // Did we win?
      if (this.stepCheckIndex === this.steps.length) {
          if (this.steps.length === this.numberOfMoves)
            // Win!
              this.callbacks.win();
          else {
            // Game goes on...
            this.stepCheckIndex = 0;
            this.newMove();
          }
      }
    } else {
      // Lose!
      this.callbacks.lose();
    }
  }

  get moveCount() {
    return this.steps.length;
  }

  // Generates randomly a value in [0, numberOfButtons - 1]
  _generateRandomStep(rand = Math.random()) {
    return Math.floor(rand * this.numberOfButtons);
  }

}

export default GameLogic;

import React from 'react';

import Button from './Button';
import LED from './LED';

let beep = new Audio('../../../assets/beep.wav');

let ButtonAndLED = React.createClass({

  propTypes: {
    ledOn: React.PropTypes.bool.isRequired,
    cb: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      enabled: true
    };
  },

  getInitialState: function() {
    return {
      ledOn: false
    };
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextProps.ledOn) {
      beep.play();
    }
  },

  render: function() {
    let styles = {
      display: 'inline-block',
      marginRight: 10,
      led: {
        marginBottom: 5
      }
    };

    return (
      <div style={styles}>
        <div style={styles.led}>
          <LED on={this.props.ledOn || this.state.ledOn} />
        </div>
        <Button cb={this.buttonPressed} enabled={this.props.enabled} />
      </div>
    );
  },

  buttonPressed(down) {
    this.setState({ ledOn: down });
    // Tell parent on button UP
    if (!down)
      this.props.cb();
  }

});

module.exports = ButtonAndLED;

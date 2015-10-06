import React from 'react';

const DIMENSION = 30;

let LED = React.createClass({

  propTypes: {
    on: React.PropTypes.bool.isRequired,
  },

  getDefaultProps: function() {
    return {
      on: false
    };
  },

  render: function() {
    let styles = {
      backgroundColor: !this.props.on ? 'rgb(11, 100, 5)' : 'rgb(68, 203, 1)',
      width: DIMENSION, height: DIMENSION, borderRadius: DIMENSION
    };

    return (
      <div style={styles} />
    );
  }
});

module.exports = LED;

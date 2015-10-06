import React from 'react/addons';
// import ReactAddons from 'react/addons';

const DIMENSION = 30;

let Button = React.createClass({

  propTypes: {
    cb: React.PropTypes.func.isRequired
  },

  render: function() {
    let styles = {
      backgroundColor: 'darkgray',
      width: DIMENSION, height: DIMENSION, borderRadius: 3,
      cursor: 'pointer',
      color: 'white'
    };
    if (!this.props.enabled)
      styles.backgroundColor = 'gray';

    return (
      <button style={styles}
        disabled={!this.props.enabled}
      onMouseDown={this.click}
      onMouseUp={this.mouseUp}>
      {this.props.enabled ? 'O' : 'X'}
      </button>
    );
  },

  click() {
    this.props.cb(true);
  },
  mouseUp() {
    this.props.cb(false);
  }

});

module.exports = Button;

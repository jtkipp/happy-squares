import React from 'react';

function HappySquare(props) {
    const boxStyle = {
      height: `${this.props.height}px`,
      width: `${this.props.width}px`,
      backgroundColor: 'red',
      boxSizing: "border-box",
      margin: '0 0 0 0',
      border: "0px",
    }
    return (<div style={boxStyle}></div>);
}
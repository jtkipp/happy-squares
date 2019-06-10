import React from 'react';
import './Cell.css';

var cellRenderCount = 0

export function GetCellRenderCount() {
  return cellRenderCount
}

export class Cell extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.alive !== nextProps.alive;
  }

  render() {
    cellRenderCount++
    let className = 'cell'
    if (this.props.alive) {
      className += ' alive'
    } else {
      className += ' not-alive'
    }
    return (<div className={className}/>);
  }
}
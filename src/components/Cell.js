import React from 'react';
import './Cell.css';

var cellRenderCount = 0

export function GetCellRenderCount() {
  return cellRenderCount
}

export function Cell(props) {
    cellRenderCount++
    let className = 'cell'
    let alive = props.board[props.i][props.j]
    if (alive) {
      className += ' alive'
    } else {
      className += ' not-alive'
    }
    return (<div className={className}/>);
  }
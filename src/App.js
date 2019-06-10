import React from 'react';
import './App.css';
import { Cell, GetCellRenderCount } from './components/Cell';

class App extends React.Component {
  constructor(props) {
    super(props)
    var { rows, cols } = getDimensions()
    var board = initialBoard(rows, cols)
    this.state = {rows, cols, board}
    this.measureRenderTime = this.measureRenderTime.bind(this)
    this.evolve = this.evolve.bind(this)
  }
  componentDidMount() {
    this.evolve()
  }
  evolve() {
    this.renderStart = new Date();
    this.setState({board: evolve(this.state.board)})
    setTimeout(this.measureRenderTime, 0)
  }
  measureRenderTime() {
    var d = (new Date()).valueOf() - this.renderStart.valueOf()
    recordAvgEvent(d);
    setTimeout(this.evolve, d < 200 ? 200.0 - d :100.0)
  }
  render() {
    var elems = []
    for (var i = 0; i < this.state.rows; i++) {
      var row = []
      for (var j = 0; j < this.state.cols; j++) {
        var alive = this.state.board[i][j]
        row.push((<Cell key={j} alive={alive}/>))
      }
      elems.push((<div key={i} style={{display: 'table-row'}}>{row}</div>))
    }
    return (
      <header className="App-header">
      <FlexCenter>
          <div style={{display: 'table'}}>
            {elems}
          </div>
          <div>
            <p>Cell renders: {GetCellRenderCount()}</p>
            <p>Average render time: {getAvg().toFixed(0)} ms</p>
          </div>
      </FlexCenter>
      </header>
    );
  }
}

function getDimensions() {
  return {rows: 100, cols: 100}
}

function evolve(prevBoard) {
  var board = []
  for (var i = 0; i < prevBoard.length; i++) {
    var boardCols = []
    for (var j = 0; j < prevBoard[0].length; j++) {
      var n = countLivingNeighbors(prevBoard, i, j);
      if (prevBoard[i][j] === 1) {
        if (n <= 1) {
          boardCols.push(0);
        } else if (n === 2 || n === 3) {
          boardCols.push(1);
        } else {
          boardCols.push(0);
        }
      } else {
        if (n === 3) {
          boardCols.push(1)
        } else {
          boardCols.push(0)
        }
      }
    }
    board.push(boardCols)
  }
  return board
}

function countLivingNeighbors(board, i, j) {
  var n = 0;
  const upper = i - 1
  const lower = i + 1
  const left = j - 1
  const right = j + 1
  const hasUpper = upper >= 0
  const hasLower = lower <= board.length - 1
  const hasLeft = left >= 0
  const hasRight = right <= board.length - 1
  if (hasUpper && hasLeft && board[upper][left]) {
    n++
  }
  if (hasUpper && board[upper][j]) {
    n++
  }
  if (hasUpper && hasRight && board[upper][right]) {
    n++
  }
  if (hasLeft && board[i][left]) {
    n++
  }
  if (hasRight && board[i][right]) {
    n++
  }
  if (hasLower && hasLeft && board[lower][left]) {
    n++
  }
  if (hasLower && board[lower][j]) {
    n++
  }
  if (hasLower && hasRight && board[lower][right]) {
    n++
  }
  return n
}


const beacon = [
[1, 1, 0, 0],
[1, 0, 0, 0],
[0, 0, 0, 1],
[0, 0, 1, 1],
];

const galaxy = [
  [1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1],
]
function initialBoard(rows, cols) {
  var heat = []
  for (var i = 0; i < rows; i++) {
    var heatCols = []
    for (var j = 0; j< cols; j++) {
      heatCols.push(0.0)
    }
    heat.push(heatCols)
  }
  for (var x = 0; x < 10; x++) {
    stamp(heat, beacon, 2, x*10+2)
    stamp(heat, beacon, 94, x*10+2)
  }
  stamp(heat, galaxy, 25, 25)
  stamp(heat, galaxy, 25, 46)
  stamp(heat, galaxy, 25, 65)
  stamp(heat, galaxy, 46, 25)
  stamp(heat, galaxy, 46, 65)
  stamp(heat, galaxy, 65, 25)
  stamp(heat, galaxy, 65, 46)
  stamp(heat, galaxy, 65, 65)
  return heat
}

function stamp(board, pattern, y, x) {
  for (var i = 0; i < pattern.length; i++) {
    for (var j = 0; j < pattern.length; j++) {
      board[i+y][j+x] = pattern[i][j]
    }
  }
}

function FlexCenter(props) {
  const flexerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '100%',
    height: '100%',
  }
  return (<div style={flexerStyle}>{props.children}</div>)
}

var averageSum = 0.0;
var averageCount = 0;
function recordAvgEvent(x) {
  averageSum = averageSum + x;
  averageCount++;
  if (averageCount > 1000) {
    averageSum = getAvg() * 10;
    averageCount = 10;
  }
}
function getAvg() {
  if (averageCount === 0) {
    return 0.0
  }
  return averageSum / averageCount
}

export default App;

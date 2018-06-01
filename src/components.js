import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

     handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
        history: history.concat([{
            squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = CalculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const description = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li>
                    <button onClick={ () => this.jumpTo(move) }>{ description }</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + ( this.state.xIsNext ? 'X': 'O' );
        }

        return (
            <div>
                <h1>Tic Tac Toe Game</h1>
                <div className="game">
                    <div>
                        <h2>Game Board</h2>
                        <Board
                            squares={ current.squares }
                            onClick={ (index) => this.handleClick(index) }
                        />
                    </div>
                    <div className="game-info">
                        <h2>Game Info</h2>
                        <div>{ status }</div>
                        <div>{ moves }</div>
                    </div>
                </div>
            </div>
        )
    }
}

class Board extends React.Component {
    renderSquare(index) {
        return <Square
            value={ this.props.squares[index] }
            onClick={ () => this.props.onClick(index) }
        />
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    { this.renderSquare(0) }
                    { this.renderSquare(1) }
                    { this.renderSquare(2) }
                </div>
                <div className="board-row">
                    { this.renderSquare(3) }
                    { this.renderSquare(4) }
                    { this.renderSquare(5) }
                </div>
                <div className="board-row">
                    { this.renderSquare(6) }
                    { this.renderSquare(7) }
                    { this.renderSquare(8) }
                </div>
            </div>
        )
    }
}

function Square(props) {
    return (
        <button className="square" onClick={ props.onClick }>
            { props.value }
        </button>
    )
}

function CalculateWinner(squares) {
    const win_lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let index = 0; index < win_lines.length; index++) {
        const [a, b, c] = win_lines[index];
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            return squares[a]
        }
    }
    return null;
}

export {Game};

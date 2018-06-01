import React from 'react';

class Game extends React.Component {
    render() {
        return (
            <div>
                <h1>Tic Tac Toe Game</h1>
                <div className="game">
                    <div>
                        <h2>Game Board</h2>
                        <Board />
                    </div>
                    <div className="game-info">
                        <h2>Game Info</h2>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    renderSquare(index) {
        return <Square
            value={ this.state.squares[index] }
            onClick={ () => this.handleClick(index) }
        />
    }

    handleClick(index) {
        const squares = this.state.squares.slice();
        squares[index] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const winner = CalculateWinner( this.state.squares );

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + ( this.state.xIsNext ? 'X': 'O' );
        }

        return (
            <div>
                <div className="status">{ status }</div>
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

import React, { Component } from "react"

import Board from './Board/Board'
import './TicTacToe.css'

export default class TicTacToe extends Component {
    constructor(props){
        super(props)
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                {squares: Array(9).fill(null)}
            ],
            moves: 0,
            xScore: 0,
            yScore: 0
        }
        this.determineWinner = this.determineWinner.bind(this)
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2) === 0
        })
    }

    undoMove(history){
        const prev = history[history.length-2]
        const squares = prev.squares.slice()
        this.setState({
            history: history.concat({
                squares:squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            moves: this.state.moves - 1
        })
    }

    newGame(){
        this.setState({
            xIsNext: true,
            stepNumber: 0,
            history: [
                {squares: Array(9).fill(null)}
            ],
            moves: 0,
            xScore: 0,
            yScore: 0
        })
    }

    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber+1)
        const current = history[history.length-1]
        const squares = current.squares.slice()
        const winner = calculateWinner(squares)
        if(winner || squares[i]){
            return
        }
        squares[i] = this.state.xIsNext ?'X':'O'
        this.setState({
            history: history.concat({
                squares:squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            moves: this.state.moves+1
        })
    }

    determineWinner(winner){
        winner === 'X'? this.setState({xScore: this.setState.xScore +1}):this.setState({yScore: this.setState.yScore +1})
    }

    /* 
        this.determineWinner(winner)
            setTimeout(() => {
                
            })
            this.setState({
                xIsNext: !this.state.xIsNext,
                stepNumber: 0,
                history: [
                    {squares: Array(9).fill(null)}
                ],
                moves: 0
            })

            setTimeout(()=>{
                status = 'Oh No! Tie'
            }, 50000)
            this.setState({
                xIsNext: this.state.xIsNext,
                stepNumber: 0,
                history: [
                    {squares: Array(9).fill(null)}
                ],
                moves: 0
            })

            <div> X's Score : {this.state.xScore} </div>
            <div> O's Score : {this.state.yScore} </div>
    */ 

    render(){
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)
        let status
        if(winner){
            status = 'Winner is ' + winner
        }
        else if(this.state.moves === 9){
            status = 'Oh No! Tie'
        }
        else{
            status = 'Player ' + (this.state.xIsNext?'X':'O') + '\'s turn'
        }
        return (
            <div className="game">
                <navbar>
                </navbar>
                <div className="game-board">
                    <Board 
                        onClick={(i)=>this.handleClick(i)}
                        squares={current.squares}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <button className="button" onClick={()=>this.undoMove(this.state.history)}> Undo move </button>
                    <button className="button" onClick={()=>this.newGame()}> 
                        Start New Game
                    </button>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for(let i = 0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c]){
            return squares[a]
        }
    }

    return null
}
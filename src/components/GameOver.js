import React, {Component} from 'react';
import '../styles/App.css';


class GameOver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            whoWon: this.props.whoWon
        }
}
    render() {
        return (
            <div>
                <h1>Game Over!!!</h1>
                <h2> The winner is {this.state.whoWon} </h2>
                <button type="button" className="start-again-btn" onClick={this.props.startOver}>Start Over</button>
            </div>
        )
    }
}

export default GameOver;

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
                <h1>GAME OVER</h1>
                <h2> The winner is {this.state.whoWon} </h2>
                <button type="button" className="start-again-btn" onClick={this.props.startOver}>Start Over</button>
                    <img src="simpsons.jpg" alt="track" style={{
                        marginTop: "30px", width: "100%"
                    }}/>

            </div>
        )
    }
}

export default GameOver;

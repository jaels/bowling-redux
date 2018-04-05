import React, {Component} from 'react';
import '../styles/App.css';


class ScoreState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOfPlayers: this.props.arrOfPlayers,
            currentPlayerIndex: this.props.currentPlayerIndex
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({currentPlayerIndex: nextProps.currentPlayerIndex})
    }

    render () {
        let { arrOfPlayers, currentPlayerIndex } = this.state;
        return (
            <div className="general-score-area">
                {
                    arrOfPlayers.map((player, index) => {
                        return (
                            <div className="player-score" key={player.player}
                            style={currentPlayerIndex === index ? {color: "red"} : {color: "black"}}>
                                <h3> Player {player.player} </h3>
                                <h2> {player.generalScore} </h2>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


export default ScoreState;

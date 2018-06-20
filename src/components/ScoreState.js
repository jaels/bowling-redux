import React, {Component} from 'react';
import '../styles/App.css';
import { connect } from "react-redux";
import * as actions from "../actions/actions";


const ScoreState = (props) => {
  return (
      <div className="general-score-area">
          {
              props.arrOfPlayers.map((player, index) => {
                  return (
                      <div className="player-score" key={index}
                      style={props.currentPlayerIndex === index ? {color: "red"} : {color: "black"}}>
                          <h3> Player {player.player} </h3>
                          <h2> {player.generalScore} </h2>
                      </div>
                  )
              })
          }
      </div>
  )
};


export default ScoreState;

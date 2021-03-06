import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ac from '../reducer/actionCreators';
import { GAME_COMPLETE, LOCAL_STORAGE_KEY, MAX_LEVEL } from "../utilities/constants";
import Header from './Header';
import Board from "./Board";
import GameComplete from "./GameComplete";
import CodeWindow from "./CodeWindow";
import BlockPalette from './BlockPalette';
import RunButton from "./RunButton";
import Help from "./Help";

const mapStateToProps = state => ({
  level: state.level,
  value: state.value,
  gameState: state.gameState
});

const App = props => {

  const { loadLevelAndTrial } = props;
  useEffect(() => {
    let savedLevelAndTrial = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    savedLevelAndTrial = savedLevelAndTrial ? (savedLevelAndTrial.level < MAX_LEVEL ? savedLevelAndTrial : {level: 0, trial: 0}) : {level: 0, trial: 0}
    loadLevelAndTrial(savedLevelAndTrial);
  }, [loadLevelAndTrial])

  const goBackToLevel1 = evt => {
    loadLevelAndTrial({level: 0, trial: 0});
  }

  if (props.gameState === GAME_COMPLETE) {
    return (
      <div className="app">
        <GameComplete />
      </div>
    )
  } else if (props.level >= 0) {
    return (
      <div className="app">
        <Header/>
        <div className="canvas">
          <div className="left-side">
            <div className="board">
              <Board/>
            </div>
          </div>
          <div className="right-side">
            <div>
              <table className="control-table">
                <tbody>
                  <tr>
                    <td className="control-table-button">
                      <RunButton />
                    </td>
                    <td width="70%">
                      <BlockPalette/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <CodeWindow name={'main'} text={'Main'} abbrev={''}/>
              <CodeWindow name={'p1'} text={'Procedure 1'} abbrev={'P1'}/>
              <CodeWindow name={'p2'} text={'Procedure 2'} abbrev={'P2'}/>
            </div>
            <div>
              <CodeWindow name={'l1'} text={'Loop 1'} abbrev={'L1'}/>
              <CodeWindow name={'l2'} text={'Loop 2'} abbrev={'L2'}/>
            </div>
          </div>
        </div>
        <Help />
        <div className="centered">
          <button onClick={goBackToLevel1}>Go back to Level 1</button>
        </div>
      </div>
    )
  } else {
    return (<div className="app">Loading...</div>)
  }
}

const actionCreators = { loadLevelAndTrial: ac.loadLevelAndTrial };

export default connect(
  mapStateToProps,
  actionCreators
)(App);

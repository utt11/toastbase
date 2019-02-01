import React from 'react';
import { connect } from 'react-redux';
import { STATUSES } from 'constants/game';
import Layout from 'components/Layout/Layout';
import Intro from 'components/Intro/Intro';
import Level1 from 'components/Level1/Level1';
import Level2 from 'components/Level2/Level2';
import Lost from 'components/Lost/Lost';
import HallOfFame from 'components/HallOfFame/HallOfFame';

const App = ({ game: {level, status }}) => (
  <div>
    <Layout>
      { status === STATUSES.INTRO && <Intro />}
      { status === STATUSES.PLAYING && level === 1 && <Level1 />}
      { status === STATUSES.PLAYING && level === 2 && <Level2 />}
      { status === STATUSES.WON && <HallOfFame />}
      { status === STATUSES.LOST && <Lost />}
    </Layout>
  </div>
);

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps)(App);

import React from 'react';
import { connect } from 'react-redux';
import { STATUSES } from 'constants/game';
import Layout from 'components/Layout/Layout';
import Intro from 'components/Intro/Intro';

const App = ({ game: {level, status }}) => (
  <div>
    <Layout>
      { status === STATUSES.INTRO && <Intro />}
    </Layout>
  </div>
);

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps)(App);

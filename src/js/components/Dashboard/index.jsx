import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

const Dashboard = ({
  counter,
}) => {
  return (
    <div className="Dashboard">
      <h2>Examples</h2>
      <hr />
      <div>
        <h3>Synchronous action</h3>
        <p>{ counter }</p>
        {/* <button onClick={handleTestButtonClick}>
          Increase counter
        </button> */}
      </div>
      <hr />
      <div>
        <h3>Async action example</h3>
      </div>
      <hr />
      <div>
        <h3>Background image</h3>
        <div className="BackgroundImgExample" />

        <h3>Image imported to the component</h3>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  counter: PropTypes.number,
};

Dashboard.defaultProps = {
  counter: 0,
};

function mapStateToProps(state) {
  return {
    asyncData: state.app.get('asyncData'),
    asyncError: state.app.get('asyncError'),
    asyncLoading: state.app.get('asyncLoading'),
    counter: state.app.get('counter'),
  };
}

export default connect(mapStateToProps, {})(Dashboard);

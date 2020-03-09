// shortcut: racfp

import React from 'react';
import PropTypes from 'prop-types';
/*
When need to interact component with Redux, eg. calling an action or getting the state, will need to use 'connect'
*/
import { connect } from 'react-redux';

/* Will map through alerts and output whatever the message and as well class for styling. Destructuring: {alerts}=props. 
'map()' will loop through array and will return jsx for each alert */
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  // shortcut: 'ptar'
  alerts: PropTypes.array.isRequired
};

/* 
Maping Redux state to a prop of this component so that we will have access to state's data (in this case it's going to be an array of alerts).
(Want to get the alert state, therefore will fetch data from state into this component)
Arrow fn takes 'state' as a parameter.
*/

const mapStateToProps = state => ({
  // Calling whatever it is needed from the reducer (../reducers/alert.js). Now will have 'props.alerts' awailable to us.
  alerts: state.alert
});

/*
Passing 'mapStateToProps' to 'connect'. Second parameter would be action that is needed to call (no actions in this case)
*/
export default connect(mapStateToProps)(Alert);

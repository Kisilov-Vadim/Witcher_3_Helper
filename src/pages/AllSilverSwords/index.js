import AllSilverSwords from './AllSilverSwords';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  language: state.language
})

const newAllSilverSwords = connect(
  mapStateToProps,
  null
)(AllSilverSwords)

export {newAllSilverSwords as AllSilverSwords}


import AllComponents from './AllComponents';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  language: state.language
})

const newAllComponents = connect(
  mapStateToProps,
  null
)(AllComponents)

export {newAllComponents as AllComponents}


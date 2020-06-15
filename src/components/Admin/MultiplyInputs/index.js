import MultiplyInputs from './MultiplyInputs';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  language: state.language
})

const newMultiplyInputs = connect(
  mapStateToProps,
  null
)(MultiplyInputs)

export {newMultiplyInputs as MultiplyInputs}


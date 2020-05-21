import Main from './Main';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  language: state.language
})

const newMain = connect(
  mapStateToProps,
  null
)(Main)

export {newMain as Main}


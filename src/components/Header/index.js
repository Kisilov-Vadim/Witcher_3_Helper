import Header from './Header';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  language: state.language
})


const newHeader = connect(
  mapStateToProps,
  null
)(Header)

export {newHeader as Header}


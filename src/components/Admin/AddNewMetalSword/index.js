import AddNewMetalSword from './AddNewMetalSword';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  language: state.language
})

const newAddNewMetalSword = connect(
  mapStateToProps,
  null
)(AddNewMetalSword)

export {newAddNewMetalSword as AddNewMetalSword}


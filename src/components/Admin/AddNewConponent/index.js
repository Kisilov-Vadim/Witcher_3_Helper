import AddNewComponent from './AddNewComponent';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  language: state.language
})

const newAddNewComponent = connect(
  mapStateToProps,
  null
)(AddNewComponent)

export {newAddNewComponent as AddNewComponent}


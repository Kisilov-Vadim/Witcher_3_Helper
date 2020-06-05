import AddNewSilverSword from './AddNewSilverSword';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  language: state.language
})

const newAddNewSilverSword = connect(
  mapStateToProps,
  null
)(AddNewSilverSword)

export {newAddNewSilverSword as AddNewSilverSword}


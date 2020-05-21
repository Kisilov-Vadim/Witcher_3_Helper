import SelectLanguage from './SelectLanguage';
import {connect} from 'react-redux';
import {setLanguage} from '../../store/actions';

const mapStateToProps = state => ({
  language: state.language
})

const mapDispatchToProps = {
  setLanguage
}

const newSelectLanguage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectLanguage)

export {newSelectLanguage as SelectLanguage}


import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../utils/colors';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.white,
  },

  textLogo: {
    color: colors.white,
    // transform: [{ rotate: '180deg'}],
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
  },
  textWelecome: {
    top: '15%',
    left: 25,
    color: colors.primary,
    // transform: [{ rotate: '180deg'}],
    fontSize: 20,

    color: colors.textColor,
    textAlign: 'center',
  },
  textKeepYourMind: {
    color: colors.primary,
    // transform: [{ rotate: '180deg'}],
    fontSize: 13,
    top: '20%',
    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 30,
    left: 25,
  },
  loginBoutton: {
    backgroundColor: colors.secandry,
    color: colors.white,
    flex: 1,
    borderRadius: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 55,
    width: width - 50,
    margin: 12,
    borderWidth: 1.3,
    borderRadius: 5,
    padding: 10,

    borderColor: colors.gray,
  },
  touchableHighlight: {
    height: 50,
    width: width - 50,
    top: 30,
  },

  forgotpassword: {
    color: colors.primary,
    fontFamily: 'Quicksand-bold',
    fontWeight: 'bold',
    fontSize: 14,
    top: 55,
    textAlign: 'center',
  },
  containerGoToSinup: {
    justifyContent: 'flex-end',
    position: 'absolute',

    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    width: '100%',
  },
  textGoToSinup: {
    fontFamily: 'Quicksand-Bold',
    fontWeight: 'bold',
    color: colors.gray,

    fontSize: 14,
  },

  textStyle: {
    textAlign: 'center',
    fontSize: 13,
  },
  modalText: {
    marginTop: -10,
    marginBottom: 15,
    textAlign: 'center',
    color: colors.textColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeBtn: {alignSelf: 'flex-end', fontSize: 20, color: colors.red, top: -10},

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,

    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },

  titleContainer: {
    backgroundColor: colors.primary,
    width: '100%',
    flex: 0.5,
    borderBottomRightRadius: 10,
  },
  title: {
    top: '50%',
    marginLeft: 25,
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
});

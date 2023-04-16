import {StyleSheet, Dimensions, View} from 'react-native';
import colors from '../utils/colors';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    top: '4%',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    alignItems: 'center',
    width: '97%',
    marginTop: '0.5%',
    height: Dimensions.get('window').height,
  },
  barOptions: {
    top: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '7%',
    width: '100%',
    backgroundColor: colors.white,
  },
  nbPages: {
    marginLeft: '5%',
    backgroundColor: colors.gray_200,
    padding: 10,
    borderRadius: 5,
  },
  titleContainer: {marginRight: '5%', flexDirection: 'row'},
});

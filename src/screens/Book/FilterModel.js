import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import {Review, Chip} from 'dev0kch-review';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {Slider} from '@miblanchard/react-native-slider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {RadioButton} from 'react-native-paper';
import {filterBooks} from '../../services/books/FetchBook';

export default function FilterModel(props) {
  const [price, setPrice] = useState(0);
  const [categoryAdventure, setCategoryAdventure] = useState(false);
  const [categoryClassics, setCategoryClassics] = useState(false);
  const [categoryCrime, setCategoryCrime] = useState(false);
  const [categoryFantasy, setCategoryFantasy] = useState(false);
  const [categoryHistorical, setCategoryHistorical] = useState(false);
  const [categoryHorror, setCategoryHorror] = useState(false);
  const [categoryHumour, setCategoryHumour] = useState(false);
  const [categoryRomance, setCategoryRomance] = useState(false);
  const [categoryWar, setCategoryWar] = useState(false);
  const [categoryWomens, setCategoryWomens] = useState(false);
  const [categoryShort, setCategoryShort] = useState(false);
  const [arabic, setArabic] = useState(false);
  const [english, setEnglish] = useState(false);
  const [french, setFrench] = useState(false);
  const [spanish, setSpanish] = useState(false);
  const [reviewChecked, setreviewChecked] = React.useState('0');

  const handlFilter = async () => {
    console.log('filter');
    var array = [];
    var languages = [];

    if (arabic == true) {
      languages.push('ar');
    }

    if (english == true) {
      languages.push('en');
    }
    if (spanish == true) {
      languages.push('sp');
    }

    if (french == true) {
      languages.push('fr');
    }

    if (categoryShort == true) {
      array.push('Short');
    }
    if (categoryWomens == true) {
      array.push('Womens');
    }
    if (categoryWar == true) {
      array.push('War');
    }
    if (categoryRomance == true) {
      array.push('Romance');
    }
    if (categoryHumour == true) {
      array.push('Humour');
    }
    if (categoryHorror == true) {
      array.push('Horror');
    }
    if (categoryHistorical == true) {
      array.push('Historical');
    }
    if (categoryFantasy == true) {
      array.push('Fantasy');
    }
    if (categoryAdventure == true) {
      array.push('Adventure');
    }
    if (categoryClassics == true) {
      array.push('Classics');
    }
    if (categoryCrime == true) {
      array.push('Crime');
    }
    var reviewValue = reviewChecked == 0 ? 0 : reviewChecked.substring(2, 3);

    console.log(price);
    console.log(array);
    console.log(languages);
    console.log(reviewValue);
    var data = await filterBooks(
      price == 0 ? 0 : price[0],
      array,
      languages,
      reviewValue,
    );
    console.log(data);
    if (data != '') {
      props.data(data);
    } else {
      props.data([]);
    }

    props.callparentfunction();
  };

  return (
    <Modal animationType="slide" visible={props.modalVisible}>
      <View style={modelStyles.centeredView}>
        <Text style={modelStyles.title}> Filter </Text>
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={{width: '100%', flex: 1}}>
          <View style={modelStyles.optionsContainer}>
            <View style={modelStyles.categoryContainer}>
              <Text style={modelStyles.categoryTitle}>Categories</Text>
              <View>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <TouchableOpacity
                    onPress={() =>
                      setCategoryAdventure(
                        categoryAdventure === false ? true : false,
                      )
                    }>
                    <Chip
                      text={'Adventure stories'}
                      textColor={colors.textColor}
                      color={colors.secandry}
                      type={categoryAdventure === false ? 'outline' : 'fill'}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCategoryClassics(
                        categoryClassics === false ? true : false,
                      )
                    }>
                    <Chip
                      color={colors.secandry}
                      type={categoryClassics === false ? 'outline' : 'fill'}
                      text={'Classics'}
                      textColor={colors.textColor}
                      style={{marginLeft: 10}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCategoryCrime(categoryCrime === false ? true : false)
                    }>
                    <Chip
                      color={colors.secandry}
                      type={categoryCrime === false ? 'outline' : 'fill'}
                      text={'Crime'}
                      textColor={colors.textColor}
                      style={{marginLeft: 10}}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <TouchableOpacity
                    onPress={() =>
                      setCategoryFantasy(
                        categoryFantasy === false ? true : false,
                      )
                    }>
                    <Chip
                      color={colors.secandry}
                      type={categoryFantasy === false ? 'outline' : 'fill'}
                      text={'Fantasy'}
                      style={{}}
                      textColor={colors.textColor}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCategoryHistorical(
                        categoryHistorical === false ? true : false,
                      )
                    }>
                    <Chip
                      color={colors.secandry}
                      type={categoryHistorical === false ? 'outline' : 'fill'}
                      style={{marginLeft: 10}}
                      text={'Historical fiction'}
                      textColor={colors.textColor}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCategoryHorror(categoryHorror === false ? true : false)
                    }>
                    <Chip
                      color={colors.secandry}
                      type={categoryHorror === false ? 'outline' : 'fill'}
                      style={{marginLeft: 10}}
                      text={'Horror'}
                      textColor={colors.textColor}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <TouchableOpacity
                    onPress={() =>
                      setCategoryHumour(categoryHumour === false ? true : false)
                    }>
                    <Chip
                      color={colors.secandry}
                      type={categoryHumour === false ? 'outline' : 'fill'}
                      text={'Humour and satire'}
                      textColor={colors.textColor}
                      style={{}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCategoryRomance(
                        categoryRomance === false ? true : false,
                      )
                    }>
                    <Chip
                      text={'Romance'}
                      color={colors.secandry}
                      type={categoryRomance === false ? 'outline' : 'fill'}
                      style={{marginLeft: 10}}
                      textColor={colors.textColor}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <TouchableOpacity
                    onPress={() =>
                      setCategoryWar(categoryWar === false ? true : false)
                    }>
                    <Chip
                      text={'War'}
                      color={colors.secandry}
                      type={categoryWar === false ? 'outline' : 'fill'}
                      textColor={colors.textColor}
                      style={{}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCategoryWomens(categoryWomens === false ? true : false)
                    }>
                    <Chip
                      text={'Women’s fiction'}
                      style={{marginLeft: 10}}
                      color={colors.secandry}
                      type={categoryWomens === false ? 'outline' : 'fill'}
                      textColor={colors.textColor}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCategoryShort(categoryShort === false ? true : false)
                    }>
                    <Chip
                      color={colors.secandry}
                      type={categoryShort === false ? 'outline' : 'fill'}
                      text={'Short stories'}
                      style={{marginLeft: 10}}
                      textColor={colors.textColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={modelStyles.sliderContainer}>
              <Text style={[modelStyles.categoryTitle, {marginTop: 30}]}>
                Price Range
              </Text>

              <Slider
                value={price}
                onValueChange={value => setPrice(value)}
                maximumValue={300}
                minimumValue={0}
                step={1}
                thumbTintColor={colors.secandry}
              />
              <View style={modelStyles.sliderText}>
                <Text style={modelStyles.textSliderValue}>{price} $</Text>
                <Text style={modelStyles.textSliderValue}>1000 $</Text>
              </View>
            </View>
            <View style={modelStyles.languageContainer}>
              <Text
                style={[
                  modelStyles.categoryTitle,
                  {marginTop: 20, marginBottom: 10},
                ]}>
                Language
              </Text>

              <View>
                <BouncyCheckbox
                  style={{marginTop: 5}}
                  size={25}
                  fillColor={colors.secandry}
                  unfillColor="#FFFFFF"
                  text="Arabic"
                  isChecked={arabic}
                  onPress={() => setArabic(!arabic)}
                  iconStyle={{borderColor: colors.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                  }}
                />

                <BouncyCheckbox
                  style={{marginTop: 5}}
                  size={25}
                  fillColor={colors.secandry}
                  unfillColor="#FFFFFF"
                  text="English"
                  isChecked={english}
                  onPress={() => setEnglish(!english)}
                  iconStyle={{borderColor: colors.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                  }}
                />

                <BouncyCheckbox
                  style={{marginTop: 5}}
                  size={25}
                  fillColor={colors.secandry}
                  unfillColor="#FFFFFF"
                  text="French"
                  isChecked={french}
                  onPress={() => setFrench(!french)}
                  iconStyle={{borderColor: colors.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                  }}
                />

                <BouncyCheckbox
                  style={{marginTop: 5}}
                  size={25}
                  fillColor={colors.secandry}
                  isChecked={spanish}
                  onPress={() => setSpanish(!spanish)}
                  unfillColor="#FFFFFF"
                  text="Spanish"
                  iconStyle={{borderColor: colors.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                  }}
                />
              </View>
            </View>

            <View style={modelStyles.reviewContainer}>
              <Text
                style={[
                  modelStyles.categoryTitle,
                  {marginTop: 30, marginBottom: 10},
                ]}>
                Customer Review
              </Text>

              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Review review={1} color={colors.primary}></Review>

                <RadioButton
                  value="up1"
                  color={colors.secandry}
                  status={reviewChecked === 'up1' ? 'checked' : 'unchecked'}
                  onPress={() => setreviewChecked('up1')}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Review review={2} color={colors.primary}></Review>

                <RadioButton
                  value="up2"
                  color={colors.secandry}
                  status={reviewChecked === 'up2' ? 'checked' : 'unchecked'}
                  onPress={() => setreviewChecked('up2')}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Review review={3} color={colors.primary}></Review>

                <RadioButton
                  value="up3"
                  color={colors.secandry}
                  status={reviewChecked === 'up3' ? 'checked' : 'unchecked'}
                  onPress={() => setreviewChecked('up3')}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Review review={4} color={colors.primary}></Review>

                <RadioButton
                  value="up4"
                  color={colors.secandry}
                  status={reviewChecked === 'up4' ? 'checked' : 'unchecked'}
                  onPress={() => setreviewChecked('up4')}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Review review={5} color={colors.primary}></Review>

                <RadioButton
                  value="up5"
                  color={colors.secandry}
                  status={reviewChecked === 'up5' ? 'checked' : 'unchecked'}
                  onPress={() => setreviewChecked('up5')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={modelStyles.buttonContainer}>
        <Pressable
          style={[modelStyles.buttonOpen]}
          onPress={() => props.callparentfunction()}>
          <Text style={modelStyles.textResetStyle}>Reset</Text>
        </Pressable>

        <Pressable style={[modelStyles.buttonClose]} onPress={handlFilter}>
          <Text style={modelStyles.textStyle}>Done</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const modelStyles = StyleSheet.create({
  centeredView: {
    height: '88%',

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: '100%',
    height: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.primary,
    width: '45%',
    height: 45,
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  buttonOpen: {
    width: '45%',
    height: 45,

    backgroundColor: colors.gray_200,
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textResetStyle: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 10,
    top: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  sliderContainer: {
    marginLeft: 10,
    marginRight: 10,
    width: '80%',
    alignItems: 'stretch',
  },

  sliderText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSliderValue: {
    top: -5,
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    color: colors.textColor,
  },
  languageContainer: {
    width: '80%',
  },
  reviewContainer: {
    width: '80%',
    marginBottom: 40,
  },
  title: {
    color: colors.black,
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
  },
  categoryContainer: {
    width: '80%',
  },
  categoryTitle: {
    fontSize: 15,
    color: colors.textColor,
    fontFamily: 'Quicksand-Bold',
  },
});

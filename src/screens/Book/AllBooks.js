import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
  Touchable,
} from 'react-native';
import {Review, Chip} from 'dev0kch-review';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Device from 'react-native-device-detection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfigWs from '../../config/ConfigWs';
import {Slider} from '@miblanchard/react-native-slider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {RadioButton} from 'react-native-paper';

export default function AlBooks({navigation}) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState(10);
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
  const [reviewChecked, setreviewChecked] = React.useState('up1');

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await fetch(
        ConfigWs.BaseUrl + 'books',

        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
        },
      );

      if (response != null) {
        if (response.status === 200) {
          const json = await response.json();

          setData(json);
        } else {
          console.log('wr : ' + response.json);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const TrendingItem = ({book}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {
          params: book,
        })
      }>
      <View style={{flexDirection: 'row', padding: 10}}>
        <Image
          source={{uri: book.image}}
          resizeMode={'stretch'}
          style={styles.imageTrending}
        />
        <View style={{left: '10%', flex: 1}}>
          <Text>{book.title}</Text>
          <Text>By John Welser</Text>
          <View style={{top: 10}}>
            <Review
              color={colors.secandry}
              nbStart={5}
              review={4.5}
              size={20}
            />
          </View>
        </View>
        <View
          style={{
            right: '25%',
            top: 20,
          }}>
          <Icon name="ios-basket" size={40} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const handlFilter = () => {
    console.log('filter');
    var array = [];

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
    console.log(price);
    console.log(array);
    console.log(arabic);
    console.log(english);
    console.log(french);
    console.log(spanish);
    console.log(reviewChecked);
    // setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search for Books..." style={styles.input} />
          <Icon
            style={styles.searchIcon}
            name="search-outline"
            color={colors.gray}
            size={20}
          />
          <Icon
            style={styles.iconFilter}
            name="options-outline"
            color={colors.secandry}
            onPress={() => setModalVisible(true)}
            size={30}
          />
        </View>

        <View style={styles.trendingBooks}>
          {data.map(item => (
            <TrendingItem book={item} key={item.id} />
          ))}
        </View>
      </ScrollView>

      <Modal animationType="slide" visible={modalVisible}>
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
                        setCategoryHorror(
                          categoryHorror === false ? true : false,
                        )
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
                        setCategoryHumour(
                          categoryHumour === false ? true : false,
                        )
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
                        setCategoryWomens(
                          categoryWomens === false ? true : false,
                        )
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
                  maximumValue={1000}
                  minimumValue={1}
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
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={modelStyles.textResetStyle}>Reset</Text>
          </Pressable>

          <Pressable style={[modelStyles.buttonClose]} onPress={handlFilter}>
            <Text style={modelStyles.textStyle}>Done</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

// Mobile Styles
let imagewidth = width / 2 - 25;
let imageHeight = height / 3.7;
let searchWidth = width - 70;

Dimensions.addEventListener('change', () => {
  width = Dimensions.get('window').width;
  height = Dimensions.get('window').height;

  // Tablet Styles
  if (Device.isTablet) {
    imagewidth = width / 3 - 70;
    imageHeight = height / 3;
    searchWidth = width - 70;
  }
});

if (Device.isTablet) {
  imagewidth = width / 3 - 70;
  imageHeight = height / 3 - 100;
  searchWidth = width - 70;
}
if (Device.isTablet && width > 1000) {
  imagewidth = width / 4 - 70;
  imageHeight = height / 3 - 30;
  searchWidth = width - 70;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  input: {
    top: 20,
    height: 40,
    width: '78%',
    margin: 12,
    backgroundColor: colors.gray_200,
    borderRadius: 50,
    paddingLeft: 40,

    borderColor: colors.gray,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
    left: 10,
    width: '100%',
  },
  searchIcon: {
    top: 40,
    left: '6%',
    position: 'absolute',
  },

  popularContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
  },
  popularText: {
    paddingLeft: 20,
    fontSize: 17,
    fontFamily: 'Quicksand-Regular',
    color: colors.textColor,
    fontWeight: 'bold',
  },
  showAllText: {
    right: 15,

    fontFamily: 'Quicksand-Regular',
    color: colors.secandry,
    fontWeight: 'bold',
  },

  item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginLeft: 10,
    borderRadius: 30,
  },
  titleContainer: {
    width: imagewidth - 10,
    justifyContent: 'flex-start',
  },
  auther: {
    top: 10,
    fontSize: 11,
  },

  title: {
    top: 10,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.textColor,
  },
  popularList: {
    marginLeft: 10,
    top: 30,
  },
  image: {
    width: imagewidth - 60,
    height: imageHeight - 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  backgroundImage: {
    width: imagewidth - 10,
    justifyContent: 'center',
    alignItems: 'center',

    height: imageHeight,
  },
  trendingBooks: {
    top: 20,
    left: 20,
    marginBottom: '12%',
  },
  imageTrending: {
    width: 60,
    height: 80,
    padding: 10,
    borderRadius: 7,
  },

  iconFilter: {
    top: 20,
    left: 0,
    right: 5,
  },
});

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

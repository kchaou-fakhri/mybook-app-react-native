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
} from 'react-native';
import {Review, Chip} from 'dev0kch-review';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Device from 'react-native-device-detection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfigWs from '../../config/ConfigWs';
import {Slider} from '@miblanchard/react-native-slider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function AlBooks({navigation}) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState(10);
  const [isCheckedArab, setIsCheckedArab] = useState(false);
  const [chip, setChip] = useState('outline');

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

  const handlChip = () => {
    if (chip === 'outline') {
      setChip('fill');
    } else {
      setChip('outline');
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
            color={colors.primary}
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

      <Modal animationType="fade" visible={modalVisible}>
        <View style={modelStyles.centeredView}>
          <Text style={modelStyles.title}> Filter </Text>
          <View style={modelStyles.optionsContainer}>
            <View style={modelStyles.categoryContainer}>
              <Text style={modelStyles.categoryTitle}>Categories</Text>
              <View>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Chip
                    onPress={handlChip}
                    text={'Adventure stories'}
                    textColor={colors.textColor}
                    style={{marginLeft: 10}}
                  />
                  <Chip
                    text={'Classics'}
                    textColor={colors.textColor}
                    style={{marginLeft: 10}}
                  />
                  <Chip
                    text={'Crime'}
                    textColor={colors.textColor}
                    style={{marginLeft: 10}}
                  />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Chip
                    text={'Fantasy'}
                    style={{marginLeft: 10}}
                    textColor={colors.textColor}
                  />
                  <Chip
                    style={{marginLeft: 10}}
                    text={'Historical fiction'}
                    textColor={colors.textColor}
                  />
                  <Chip
                    style={{marginLeft: 10}}
                    text={'Horror'}
                    textColor={colors.textColor}
                  />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Chip
                    text={'Humour and satire'}
                    textColor={colors.textColor}
                    style={{marginLeft: 10}}
                  />
                  <Chip
                    text={'Romance'}
                    style={{marginLeft: 10}}
                    textColor={colors.textColor}
                  />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Chip
                    text={'War'}
                    textColor={colors.textColor}
                    style={{marginLeft: 10}}
                  />

                  <Chip
                    text={'Women’s fiction'}
                    style={{marginLeft: 10}}
                    textColor={colors.textColor}
                  />

                  <Chip
                    text={'Short stories'}
                    style={{marginLeft: 10}}
                    textColor={colors.textColor}
                  />
                </View>
              </View>
            </View>

            <View style={modelStyles.sliderContainer}>
              <Slider
                value={price}
                onValueChange={value => setPrice(value)}
                maximumValue={5000}
                minimumValue={10}
                step={1}
                thumbTintColor={colors.primary}
              />
              <View style={modelStyles.sliderText}>
                <Text style={modelStyles.textSliderValue}>{price} $</Text>
                <Text style={modelStyles.textSliderValue}>5000 $</Text>
              </View>
            </View>
            <View style={modelStyles.languageContainer}></View>
          </View>
          <View style={modelStyles.buttonContainer}>
            <Pressable
              style={[modelStyles.buttonOpen]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={modelStyles.textResetStyle}>Reset</Text>
            </Pressable>

            <Pressable
              style={[modelStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={modelStyles.textStyle}>Done</Text>
            </Pressable>
          </View>
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
    top: 25,
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
    top: 60,
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
    flex: 1,

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
    justifyContent: 'space-between',
    flex: 1,
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
    flexDirection: 'row',
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

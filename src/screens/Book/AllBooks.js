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

import FilterModel from '../UIcomponent/FilterModel';

export default function AlBooks({navigation}) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await fetch(
        ConfigWs.BaseUrl + 'books/0',

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
          <Text
            style={{
              textAlign: 'left',
            }}>
            {book.title}
          </Text>
          <Text>By John Welser</Text>
          <View style={{top: 10}}>
            <Review
              color={colors.primary_200}
              nbStart={5}
              review={book.review}
              size={20}
            />
          </View>
        </View>
        <View
          style={{
            right: '30%',
            top: 20,
          }}>
          <Text style={[styles.title, {fontSize: 14}]}>
            ${parseFloat(book.price).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const updateModelVisible = () => {
    setModalVisible(!modalVisible);
    console.log('model state : ' + modalVisible);
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

      <FilterModel
        modalVisible={modalVisible}
        data={setData}
        callparentfunction={() => updateModelVisible()}></FilterModel>
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

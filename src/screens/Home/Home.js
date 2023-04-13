import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Device from 'react-native-device-detection';
import {Review} from 'dev0kch-review';
import colors from '../utils/colors';
import config from '../../config/ConfigWs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import strings from '../utils/strings';
export default class Home extends Component {
  state = {
    data: [],
  };

  constructor(props) {
    super(props);
    this.getPopularBooks;
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await fetch(
        config.BaseUrl + 'books/0',

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
          console.log('Start Display data');
          this.setState({data: json});

          console.log(json);
        } else {
          console.log('wr : ' + response.json);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  render(props) {
    const {navigation} = this.props;
    const Item = ({title}) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', {params: title})}>
        <View style={[styles.item]}>
          <ImageBackground
            blurRadius={20}
            style={styles.backgroundImage}
            imageStyle={{borderRadius: 10, opacity: 0.3}}
            source={{uri: title.image}}>
            <View style={{elevation: 12}}>
              <FastImage
                style={styles.image}
                resizeMode={FastImage.resizeMode.stretch}
                source={{uri: title.image, priority: FastImage.priority.normal}}
              />
            </View>
          </ImageBackground>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title.title}</Text>
            <Text style={styles.auther}>By John Welser</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

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
          </View>

          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>{strings.popular_new}</Text>
            <Text
              style={styles.showAllText}
              onPress={() => navigation.navigate('BookListSeeMore')}>
              {strings.show_all}
            </Text>
          </View>

          <View style={styles.popularList}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.state.data.map(item => (
                <Item title={item} key={item.id} />
              ))}
              {/*<FlatList*/}
              {/*  data={this.state.data}*/}
              {/*  horizontal={true}*/}
              {/*  showsHorizontalScrollIndicator={false}*/}
              {/*  renderItem={({item}) => <Item title={item} />}*/}
              {/*  keyExtractor={item => item.id}*/}
              {/*/>*/}
            </ScrollView>
          </View>

          <View style={[styles.popularContainer, {top: 45}]}>
            <Text style={styles.popularText}>{strings.trending_books}</Text>
            <Text
              style={styles.showAllText}
              onPress={() => navigation.navigate('BookListSeeMore')}>
              {strings.show_all}
            </Text>
          </View>
          <View style={styles.trendingBooks}>
            {this.state.data.map(item => (
              <TrendingItem book={item} key={item.id} />
            ))}
            {/*<FlatList*/}
            {/*  data={this.state.data}*/}
            {/*  renderItem={({item}) => <TrendingItem book={item} />}*/}
            {/*  keyExtractor={item => item.id}*/}
            {/*/>*/}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
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
    width: '90%',
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
    justifyContent: 'center',
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
    height: imageHeight + 60,
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
});

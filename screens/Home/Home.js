import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Text,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Device from 'react-native-device-detection';

import colors from '../utils/colors';

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
      const response = await fetch(
        'https://book-store-backend-production-9c87.up.railway.app/books',
      );

      if (response != null) {
        if (response.status == 200) {
          const json = await response.json();

          this.setState({data: json});

          //  console.log(json);
        } else {
          console.log('wr : ' + response.json);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const Item = ({title}) => (
      <View style={[styles.item]}>
        <ImageBackground
          blurRadius={20}
          style={styles.backgroundImage}
          imageStyle={{borderRadius: 10, opacity: 0.3}}
          source={{uri: title.image}}>
          <View style={{elevation: 12}}>
            <Image
              style={styles.image}
              resizeMode="stretch"
              source={{uri: title.image}}
            />
          </View>
        </ImageBackground>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title.title}</Text>
        </View>
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
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
          <Text style={styles.popularText}>Popular New</Text>
          <Text style={styles.showAllText}>Show all</Text>
        </View>

        <View style={styles.popularList}>
          <FlatList
            data={this.state.data}
            horizontal={true}
            renderItem={({item}) => <Item title={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

// Mobile Styles
let imagewidth = width / 2 - 40;
let imageHeight = 200;
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
    paddingLeft: 40,
    fontSize: 20,
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
    width: 140,
    justifyContent: 'center',
  },

  title: {
    top: 10,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'left',
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
    width: imagewidth,
    justifyContent: 'center',
    alignItems: 'center',

    height: imageHeight,
  },
});

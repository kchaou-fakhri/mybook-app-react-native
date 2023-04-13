import React, {useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Modal,
} from 'react-native';
import Device from 'react-native-device-detection';
import colors from '../utils/colors';
import {Review} from 'dev0kch-review';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import strings from '../utils/strings';

export default function Details(props) {
  const {route, navigation} = props;
  let des = route.params.params.description;

  const [heartIcon, setHeartIcon] = useState('heart-outline');
  const [landscape, setLandscape] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height
      ? 'row'
      : 'column',
  );
  const [description, setDescription] = useState(
    des.length > 200 ? des.substring(0, 100) : des,
  );
  const [seeMore, setSeeMore] = useState(' ...See More');
  const [visible, setVisible] = React.useState(false);

  Dimensions.addEventListener('change', () => {
    setLandscape(
      Dimensions.get('window').width > Dimensions.get('window').height
        ? 'row'
        : 'column',
    );
  });

  const handlBack = () => {
    setTimeout(() => {
      navigation.goBack(null);
    }, 300);
  };

  const handleIcon = () => {
    if (heartIcon === 'heart-outline') {
      setHeartIcon('heart');
    } else {
      setHeartIcon('heart-outline');
    }
  };

  function handleDescription() {
    setVisible(true);
  }

  return (
    <SafeAreaView style={[styles.container, {flexDirection: landscape}]}>
      <View style={styles.iconBackContainer}>
        <TouchableOpacity onPress={handlBack}>
          <View style={[styles.iconBackStyle, {width: 45}]}>
            <Icon
              style={{marginLeft: 5}}
              name={'chevron-back-outline'}
              color={colors.primary}
              size={34}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bookContainer}>
        <ImageBackground
          blurRadius={20}
          style={
            Dimensions.get('window').width < Dimensions.get('window').height
              ? styles.backgroundImage
              : styles.backgroundImageLandscape
          }
          imageStyle={{borderRadius: 10, opacity: 0.15}}
          source={{uri: route.params.params.image}}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack(null);
              }}>
              <View></View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleIcon}>
              <View style={styles.iconStyle}>
                <Icon name={heartIcon} color={colors.primary} size={34} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{elevation: 12}}>
            <Image
              style={styles.image}
              resizeMode="stretch"
              source={{uri: route.params.params.image}}
            />
          </View>

          <View style={styles.imageDescriptionContainer}>
            <Text style={styles.title}>{route.params.params.title}</Text>
            <Text style={styles.auther}>By John Welser</Text>
          </View>

          <View style={{top: 25}}>
            <Review
              color={colors.primary}
              nbStart={5}
              review={route.params.params.review}
              size={20}
            />
          </View>
        </ImageBackground>
      </View>

      <View
        style={
          Dimensions.get('window').width < Dimensions.get('window').height
            ? styles.descriptionContainer
            : styles.descriptionContainerLandscape
        }>
        <View
          style={
            Dimensions.get('window').width < Dimensions.get('window').height
              ? styles.priceContainer
              : styles.priceContainerLandscape
          }>
          <Text style={styles.title}>{strings.description}</Text>
          <Text style={styles.price}>${route.params.params.price}</Text>
        </View>

        <View
          style={
            Dimensions.get('window').width < Dimensions.get('window').height
              ? styles.textContainer
              : styles.textContainerLandscape
          }>
          <Text style={styles.text}>
            {description}

            <Text style={styles.seeMore} onPress={handleDescription}>
              {' '}
              {seeMore}
            </Text>
          </Text>
        </View>

        <View
          style={
            Dimensions.get('window').width < Dimensions.get('window').height
              ? styles.btnBuy
              : styles.btnBuyLandscape
          }>
          <TouchableHighlight
            style={
              Dimensions.get('window').width < Dimensions.get('window').height
                ? styles.touchableHighlight
                : styles.touchableHighlightLandscape
            }>
            <Text
              style={[styles.loginBoutton]}
              onPress={() =>
                navigation.navigate('Reader', {
                  params: route.params.params,
                })
              }>
              {strings.btn_buy}
            </Text>
          </TouchableHighlight>
        </View>
      </View>

      <Modal animationType="slide" transparent={false} visible={visible}>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text onPress={() => setVisible(false)} style={styles.closeBtn}>
                ✕
              </Text>
              <Text style={styles.modalText}>Description</Text>

              <Text style={styles.textStyle}>{des}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

// Mobile Styles
let imagewidth = width / 1.6;
let imageHeight = height / 2.8;
let searchWidth = width - 70;
let direction = 'column';

Dimensions.addEventListener('change', () => {
  width = Dimensions.get('window').width;
  height = Dimensions.get('window').height;

  // Tablet Styles
  if (Device.isTablet) {
    imagewidth = width / 2;
    imageHeight = height / 2.1;
    searchWidth = width - 70;
  }
  if (width > height) {
    imagewidth = width / 2.5;
    imageHeight = height / 2.1;
    searchWidth = width - 70;
  }
});

if (Device.isTablet) {
  imagewidth = width / 2.1;
  imageHeight = height / 2.3;
  searchWidth = width - 70;
}
if (width > height) {
  imagewidth = width / 3;
  imageHeight = height / 2;
  searchWidth = width - 70;
  direction = 'row';
}

const styles = StyleSheet.create({
  container: {
    top: 60,
  },
  bookContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: imagewidth + 80,
    justifyContent: 'center',
    alignItems: 'center',

    height: imageHeight + 180,
  },
  backgroundImageLandscape: {
    width: imagewidth + 80,
    height: imageHeight + 180,
    justifyContent: 'center',
    alignItems: 'center',
    left: '10%',
    top: '10%',
  },

  image: {
    width: imagewidth - 50,
    height: imageHeight,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    bottom: 5,
    top: 7,
  },
  imageDescriptionContainer: {
    top: '1%',
    alignItems: 'center',
  },

  title: {
    top: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.textColor,
  },
  auther: {
    top: 15,
    fontSize: 13,
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -20,

    width: imagewidth + 30,
  },

  iconBackContainer: {
    bottom: 20,
    left: 20,

    width: imagewidth + 30,
  },

  iconStyle: {
    width: 45,
    height: 45,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 50,
  },
  iconBackStyle: {
    top: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 46, 61, 0.3)',
    borderRadius: 50,
  },

  descriptionContainer: {
    top: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.textColor,
  },
  descriptionContainerLandscape: {
    top: '5%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.textColor,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '8%',
    marginRight: '8%',
  },
  priceContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '48%',
    marginLeft: '8%',
    marginRight: '8%',
  },
  price: {
    top: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.green,
  },
  textContainer: {
    marginLeft: '8%',
    marginRight: '8%',
    top: '20%',
  },
  textContainerLandscape: {
    width: '50%',
    marginLeft: '8%',
    marginRight: '8%',
    top: '10%',
    bottom: '10%',
  },

  text: {
    color: colors.gray,

    lineHeight: 18,
  },

  loginBoutton: {
    backgroundColor: colors.primary,
    color: colors.white,
    fontWeight: 'bold',
    flex: 1,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  touchableHighlight: {
    height: 50,
    width: width / 2.3,
    top: 60,
  },
  touchableHighlightLandscape: {
    height: 50,
    width: width / 4,
    top: 60,
  },
  btnBuy: {
    alignItems: 'flex-end',
    marginRight: '8%',
  },
  btnBuyLandscape: {
    marginLeft: '8%',
    position: 'absolute',
    marginTop: '40%',
    left: '25%',
  },
  seeMore: {
    fontFamily: 'Quicksand-Regular',
    color: colors.primary_200,
  },

  textStyle: {
    top: 18,
    lineHeight: 18,
    color: colors.textColor,
    textAlign: 'center',
    fontSize: 14,
  },
  modalText: {
    marginBottom: 15,
    color: colors.textColor,
    fontWeight: 'bold',
  },
  closeBtn: {alignSelf: 'flex-end', fontSize: 20, color: colors.red, top: -10},

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,

    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },
});

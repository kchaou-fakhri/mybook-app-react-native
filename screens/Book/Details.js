import React,{Component} from "react";
import {View, SafeAreaView, Text, StyleSheet, Image, ImageBackground, Dimensions} from "react-native";
import Device from "react-native-device-detection";
import colors from "../utils/colors";

export default class Details extends Component{

    constructor(props) {
        super(props);
    }

    render() {
       const { route, navigation } = this.props

        console.log(route.params.params.title)

        return(
            <SafeAreaView style={styles.container}>
            <View style={styles.bookContainer}>
                <ImageBackground
                    blurRadius={20}
                    style={styles.backgroundImage}
                    imageStyle={{borderRadius: 10, opacity: 0.3}}
                    source={{uri: route.params.params.image}}>
                    <View style={{elevation: 12}}>
                        <Image
                            style={styles.image}
                            resizeMode="stretch"
                            source={{uri: route.params.params.image}}
                        />
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.title}>{route.params.params.title}</Text>
                        <Text style={styles.auther}>By John Welser</Text>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
        );
    }

}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

// Mobile Styles
let imagewidth = width / 1.5;
let imageHeight = height /2;
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
    container : {
        top : 90
    },
    bookContainer : {

        justifyContent : 'center',
        alignItems : 'center'

    },
    backgroundImage: {
        width: imagewidth + 70,
        justifyContent: 'center',
        alignItems: 'center',

        height: imageHeight+ 100,
    },


    image: {
        width: imagewidth - 60,
        height: imageHeight - 40,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        top: 10,
    },
    descriptionContainer: {
        top : '5%',
        alignItems : 'center'
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


})
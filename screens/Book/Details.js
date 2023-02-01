import React,{Component, useState} from "react";
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity, TouchableHighlight
} from "react-native";
import Device from "react-native-device-detection";
import colors from "../utils/colors";
import Review from "dev0kch-review";
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class Details extends Component{

   state =  {heartIcon : "heart-outline"}
    constructor(props) {
        super(props);

    }




    render() {

        const { route, navigation } = this.props;
            const handleIcon = () =>{
                if(this.state.heartIcon === "heart-outline"){
                    this.setState({heartIcon : "heart"})
                }
                else {
                    this.setState({heartIcon : "heart-outline"})
                }
            }

        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.bookContainer}>
                <ImageBackground
                    blurRadius={20}
                    style={styles.backgroundImage}
                    imageStyle={{borderRadius: 10, opacity: 0.15}}
                    source={{uri: route.params.params.image}}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={()=> { navigation.goBack(null)}}>

                        <View style={styles.iconStyle}>
                            <Icon name="chevron-back-outline"  color={colors.primary} size={34}/>

                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={ handleIcon}>
                                <View style={styles.iconStyle}>
                                    <Icon name={this.state.heartIcon} color={colors.primary} size={34}/>
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
                        {new Review(5, colors.secandry, 4.5, 20).render()}

                    </View>
                </ImageBackground>
            </View>


                <View style={styles.descriptionContainer}>
                       <View style={styles.priceContainer}>
                           <Text style={styles.title}>Description</Text>
                           <Text style={styles.price}>$25.00</Text>
                       </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
                    </View>

                    <View style={styles.btnBuy}>

                    <TouchableHighlight style={styles.touchableHighlight}>
                        <Text
                            style={[styles.loginBoutton]}
                            >
                            Buy now
                        </Text>
                    </TouchableHighlight>
                    </View>
                </View>
        </SafeAreaView>
        );
    }

}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

// Mobile Styles
let imagewidth = width / 1.5;
let imageHeight = height /2.5;
let searchWidth = width - 70;

Dimensions.addEventListener('change', () => {
    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;

    // Tablet Styles
    if (Device.isTablet) {
        imagewidth = width / 1.5;
        imageHeight = height / 2.5;
        searchWidth = width - 70;
    }
});

if (Device.isTablet) {
    imagewidth = width / 2;
    imageHeight = height / 2.5;
    searchWidth = width - 70;
}
if (Device.isTablet && width > 1000) {
    imagewidth = width / 2;
    imageHeight = height / 2.5;
    searchWidth = width - 70;
}


const styles = StyleSheet.create({
    container : {
        top : 60
    },
    bookContainer : {

        justifyContent : 'center',
        alignItems : 'center'

    },
    backgroundImage: {
        width: imagewidth + 80,
        justifyContent: 'center',
        alignItems: 'center',

        height: imageHeight+ 180,
    },


    image: {
        width: imagewidth -50,
        height: imageHeight,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        bottom: 5,
        top : 7
    },
    imageDescriptionContainer: {
        top : '1%',
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

    iconContainer :{
        flexDirection: 'row',
        justifyContent: 'space-between',
        top : -20,

        width: imagewidth+30,

    },

    iconStyle :{
        width : 45,
        height :45,

        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'rgba(255, 255, 255, 0.5)',
        borderRadius : 50
    },

    descriptionContainer : {
        top: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: colors.textColor,
    },
    priceContainer: {
        flexDirection : 'row',
        justifyContent : 'space-between' ,
        marginLeft :"8%",
        marginRight :"8%",

    },
    price: {
        top: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: colors.secandry,
    },
    textContainer: {
        marginLeft :"8%",
        marginRight :"8%",
        top:"20%"
    },

    text : {
        color : colors.gray,

        lineHeight : 18

    },

    loginBoutton: {
        backgroundColor: colors.secandry,
        color : colors.white,
        fontWeight : 'bold',
        flex: 1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    touchableHighlight: {
        height: 50,
        width: width /2.3,
        top: 60,
    },
    btnBuy: {
        alignItems : 'flex-end',
        marginRight : "8%"

    }


})
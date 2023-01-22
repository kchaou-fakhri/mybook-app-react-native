import React, { Component } from 'react'
import {  View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class Home extends Component {
  render() {
    return (
      <View>
        <Icon name="home-outline" size={300} color="#900" />
      </View>
    )
  }
}

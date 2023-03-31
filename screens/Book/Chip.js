import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class Chip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color ? props.color : '#3E54AC',
      textColor: props.textColor ? props.textColor : '#888888',
      borderColor: props.borderColor ? props.borderColor : '#888888',
      size: props.size ? props.size : 24,
      text: props.text ? props.text : 'Simple Text',
      type: props.type ? props.type : 'outline',
      icon: props.icon ? props.icon : 'none',
      isChecked: props.isChecked ? props.isChecked : 'false',
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    return {
      type: props.type,
      color: props.color ? props.color : '#3E54AC',
      textColor: props.textColor ? props.textColor : '#888888',
      borderColor: props.borderColor ? props.borderColor : '#888888',
      size: props.size ? props.size : 24,
      text: props.text ? props.text : 'Simple Text',
      icon: props.icon ? props.icon : 'none',
      isChecked: props.isChecked ? props.isChecked : 'false',
    };
  }

  render() {
    return (
      <View
        style={{
          backgroundColor:
            this.state.type == 'outline' ? 'white' : this.state.color,
          borderWidth: 0.8,
          borderColor:
            this.state.type == 'outline'
              ? this.state.borderColor
              : this.state.color,
          borderRadius: 7,
          paddingLeft: 13,
          paddingRight: 13,
          paddingTop: 5,
          paddingBottom: 5,
          alignSelf: 'baseline',
          flexDirection: 'row',
        }}
        needsOffscreenAlphaCompositing>
        <Icon
          style={{
            display: this.state.icon !== 'none' ? 'flex' : 'none',
            paddingRight: 5,
          }}
          name={this.state.icon}
          size={20}
          color={this.state.type == 'outline' ? '#888888' : '#ffffff'}
        />
        <Text
          style={{
            color:
              this.state.type == 'outline' ? this.state.textColor : '#ffffff',
            fontWeight: this.state.type == 'outline' ? 'bold' : 'normal',
          }}>
          {this.state.text}
        </Text>
      </View>
    );
  }
}

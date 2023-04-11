import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import styles from './Styles';
import Pdf from 'react-native-pdf';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default function Reader(props) {
  const {route, navigation} = props;
  console.log(route);
  const source = {
    uri: route.params.params.file,
    cache: true,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [nbPages, setNbPages] = useState(0);
  const [iconColor, setIconColor] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <View style={styles.barOptions}>
        <Text style={styles.nbPages}>
          {currentPage}/{nbPages}
        </Text>
        <View style={styles.titleContainer}>
          <Text style={{color: colors.textColor, marginRight: 10, top: 5}}>
            {route.params.params.title}
          </Text>
          <TouchableOpacity onPress={() => setIconColor(!iconColor)}>
            <Icon
              name={'bookmark-sharp'}
              color={iconColor == true ? colors.gray : colors.red}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Pdf
        page={1}
        source={source}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          setNbPages(numberOfPages);
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
          setCurrentPage(page);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Review from 'dev0kch-review';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default function BookListSeeMore({navigation}) {


  const [data, setData] = useState();
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
            {new Review(5, colors.secandry, 4.5, 20).render()}
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
        </View>

        <View style={styles.trendingBooks}>
          {this.data.map(item => (
            <TrendingItem book={item} key={item.id} />
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 60,
  },
});

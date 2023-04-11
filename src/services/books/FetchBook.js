import ws from '../../config/ConfigWs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const filterBooks = async (
  _price,
  _categories,
  _languages,
  _reviewChecked,
) => {
  try {
    console.log('----------FILTER STARTING-----------');
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(ws.BaseUrl + 'book/by_all', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        categories: _categories,
        languages: _languages,
        review: _reviewChecked,
        price: _price,
      }),
    });

    if (response != null) {
      if (response.status === 200) {
        const json = await response.json();
        console.log('----------FILTER FINSHED-----------');

        return json;
      } else {
        console.log('wr : ' + response.json);
        return [];
      }
    }
  } catch (error) {
    console.error(error);
  }
};

/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getWeather} from './store/actions/weatherActions';
import Form from './components/Form';
import Weather from './components/Weather';

const App = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {data, error} = useSelector((state) => state.weather);

  const searchSubmitHandler = async () => {
    if (search === '') {
      return Alert.alert('Validation', 'City name is required!', [
        {text: 'OK'},
      ]);
    }

    setLoading(true);
    // await AsyncStorage.setItem('newSearch', JSON.stringify(search));
    // console.log(
    //   'newSearch',
    //   AsyncStorage.setItem('newSearch', JSON.stringify(search)),
    // );
    dispatch(
      getWeather(
        search,
        () => setLoading(false),
        () => setLoading(false),
      ),
    );
    setSearch('');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Form
          search={search}
          onSetSearch={setSearch}
          onSubmit={searchSubmitHandler}
        />
        <Weather loading={loading} data={data} error={error} />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;

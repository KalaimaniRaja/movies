import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
  Stack,
} from 'react-native';
import {Button} from 'react-native-paper';
import config from '../config';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {List} from 'react-native-paper';
const Home = () => {
  const [movies, setMovies] = useState();

  const getMovies = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?page=1&api_key=89deae649b2e4152238928670ed9d85f',
      );
      const res = await response.json();
      return setMovies(res);
    } catch (error) {
      return console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    console.log(movies, 'movies');
    {
      console.log(
        `test ${config.tmdb.assets.baseUrlBackdropW1280}${movies?.results[14]?.poster_path}`,
      );
    }
  }, [movies]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.cardWrap}>
          {movies?.results?.map((e, index) => {
            return (
              <View style={styles.card}>
                <Image
                  style={{
                    width: '100%',
                    height: 470,
                  }}
                  resizeMode="contain"
                  resizeMethod="resize"
                  source={{
                    uri: `${config.tmdb.assets.baseUrlBackdropW1280}${e?.poster_path}`,
                  }}
                />
                <Text style={styles.title}>{e.title}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardWrap: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginVertical: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    borderRadius: 7,
    overflow: 'hidden',
    elevation: 6,
  },
  title: {
    textAlign: 'center',
    color: 'green',
    textTransform: 'capitalize',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default Home;

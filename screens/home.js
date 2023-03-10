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
  Button,
} from 'react-native';
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
  const [page, setPage] = useState(1);

  const getMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=89deae649b2e4152238928670ed9d85f`,
      );
      const res = await response.json();
      return setMovies(res);
    } catch (error) {
      return console.error(error);
    }
  };

  const prevPage = () => {
    setPage(page - 1);
    getMovies();
  };

  const nextPage = () => {
    setPage(page + 1);
    getMovies();
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
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.cardWrap}>
              {movies?.results?.map(e => {
                return (
                  <View style={styles.card} key={e.title}>
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
        </View>
        {movies && (
          <View style={styles.footer}>
            <View style={styles.footerItem}>
              {page !== 1 && (
                <>
                  <Button onPress={prevPage} title="Prev" color="#841584" />
                </>
              )}
              <Text style={{color: '#fff', marginHorizontal: 5}}></Text>
              {page !== movies?.total_pages && (
                <>
                  <Button onPress={nextPage} title="Next" color="#841584" />
                </>
              )}
            </View>

            <View style={styles.footerItem}>
              <Text style={styles.footerText}>
                pages : {movies?.total_pages}
              </Text>
              <Text style={{color: '#fff', marginHorizontal: 5}}>|</Text>
              <Text style={styles.footerText}>current page : {page}</Text>
              <Text style={{color: '#fff', marginHorizontal: 5}}>|</Text>
              <Text style={styles.footerText}>
                movies : {movies?.total_results}
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardWrap: {
    padding: 15,
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
  content: {
    height: '80%',
  },
  footer: {
    height: '20%',
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 3,
  },
  contentContainer: {
    height: '100%',
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    margin: 5,
    textTransform: 'capitalize',
  },
});

export default Home;

import { View, Text, ScrollView, FlatList, TouchableOpacity, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Input from "../../components/Input/index"
import styles from "./style"
import Button from "../../components/Button/index"
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../constants/colors'
import axios from 'axios'
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from "react-native-actions-sheet"; 

const Home = () => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [phonetic, setPhonetic] = useState();
  const [source, setSource] = useState();
  const [search, setSearch] = useState();
  const [favorites, setFavorites] = useState([])
  const [searcsResult, setSearchResult] = useState([])
  const [actionTitle, setActionTitle] = useState(true)
  const [fav, setFav] = useState(false);
  const actionSheetRef = useRef(null);


  useEffect(() => {
    getFavorites()
  }, [])

  const fetchData = () => {
    setLoading(true);
    axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + search)
      .then((res) => {
        setData(res?.data?.[0]?.meanings);
        setPhonetic(res?.data?.[0]?.phonetics?.[0]?.text);
        setSource(res?.data?.[0]?.sourceUrls)

      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }


  const renderItem = ({ item }) => {
    return (
      <Text style={styles.synonyms}>{item}, </Text>
    )
  }

  const renderItemAntonyms = ({ item }) => {
    return (
      <Text style={styles.antonyms}>{item}</Text>
    )
  }

  const renderSource = ({ item }) => {
    return (
      <Text style={styles.desc}>{item}</Text>
    )
  }

  const renderDefinition = ({ item }) => {
    return (
      <Text style={styles.desc}>{item.definition}</Text>
    )
  }

  const startAudio = () => {
    Tts.stop();
    Tts.speak(search)

  }

  const chooseFav = async () => {

    try {
      let favs = []
      const value = await AsyncStorage.getItem('name')

      if (value !== null) {
        favs = JSON.parse(value)

        favs = favs.filter(fav => fav != search)
      }
      if (fav === false) {
        favs.push(search)
      }

      await AsyncStorage.setItem('name', JSON.stringify(favs));

    } catch (e) {
      console.log(e);
    }
    finally {
      setFav(!fav)
    }

  }

  const onPressSearch = () => {
    fetchData();
    getFavorites();
    sendSearchResult();

  }

  const getFavorites = async () => {
    try {
      let favs = []
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
        favs = JSON.parse(value)
        setFavorites(favs)
        if (favs.includes(search)) {
          setFav(true)
        }
        else {
          setFav(false)
        }
      }
    } catch (e) {
      console.log(e);
    }
    finally {
      setActionTitle(true)
    }
  };

  const onPrenssMoments = () => {
    actionSheetRef.current?.show();
  }

  const deleteSearch = async (item) => {
    try {
      let favs = []
      const value = await AsyncStorage.getItem('search')

      if (value !== null) {

        favs = JSON.parse(value)
        favs = favs.filter(fav => fav != item)
      }

      await AsyncStorage.setItem('search', JSON.stringify(favs));

    } catch (e) {
      console.log(e);
    }
    finally {
      getSearchs()
    }
  }

  const deleteFav = async (item) => {
    try {
      let favs = []
      const value = await AsyncStorage.getItem('name')

      if (value !== null) {
        favs = JSON.parse(value)
        favs = favs.filter(fav => fav != item)
      }

      await AsyncStorage.setItem('name', JSON.stringify(favs));

    } catch (e) {
      console.log(e);
    }
    finally {
      getFavorites()
    }
  }

  const renderFavorites = ({ item, index }) => {
    const itemNumber = index + 1;
    return (
      <View style={styles.indexContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.indexTitle}>{itemNumber}</Text>
          <Text style={styles.favoriteWord}>{item}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteFav(item)}>
          <Ionicons name="heart" size={18} style={{ color: "red" }} />
        </TouchableOpacity>
      </View>

    )

  }

  const renderSearchResult = ({ item, index }) => {
    const itemNumber = index + 1;
    return (
      <View style={styles.indexContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.indexTitle}>{itemNumber}</Text>
          <Text style={styles.favoriteWord}>{item}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteSearch(item)}>
          <AntDesign name="delete" size={20} />
        </TouchableOpacity>

      </View>

    )
  }

  const sendSearchResult = async () => {
    try {
      let searchs = []
      const value = await AsyncStorage.getItem('search')

      if (value !== null) {
        searchs = JSON.parse(value)
      }
      searchs.push(search)

      await AsyncStorage.setItem('search', JSON.stringify(searchs));

    } catch (e) {
      console.log(e);
    }

  }

  const getSearchs = async () => {
    try {
      let searchs = []
      const value = await AsyncStorage.getItem('search');
      if (value !== null) {
        searchs = JSON.parse(value)
        setSearchResult(searchs)
      }
    } catch (e) {
      console.log(e);
    }
    finally {
      setActionTitle(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inContainer}>
        <Text style={styles.text}>Dictionary</Text>
        <TouchableOpacity onPress={onPrenssMoments}><Text style={styles.profile}>Hareketler</Text></TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Input style={styles.input} placeholder={"Arama yapınız.."} onChangeText={setSearch} />
        <Button style={styles.btn} text={"Ara."} onPress={onPressSearch} />
      </View>
      <View style={styles.playText}>
        <Text style={styles.title}>{search}</Text>
        <Button style={styles.button} onPress={startAudio} >
          <Ionicons name='play' size={24} color={colors.white} />
        </Button>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", }}>
        <Text style={{ fontSize: 16, color: colors.lightBlue }}>{phonetic}</Text>
        {search && <TouchableOpacity onPress={chooseFav}>
          <Ionicons name={fav ? 'heart' : "heart-outline"} size={18} color={"red"} style={{ left: 5 }} />
        </TouchableOpacity>}

      </View>


      <View style={styles.nounContainer}>
        <View style={styles.inContainer}>
          <Text style={styles.noun}>noun</Text>
          <View style={styles.line}></View>
        </View>

        <Text style={styles.meaning}>Meaning</Text>
        <FlatList data={data?.[0]?.definitions} renderItem={renderDefinition} />

        <Text style={styles.titleComplete}>Synonyms</Text>
        <FlatList data={data?.[0]?.synonyms} renderItem={renderItem} horizontal />

        <Text style={styles.titleComplete}>Antonyms</Text>
        <FlatList data={data?.[0]?.antonyms} renderItem={renderItemAntonyms} horizontal />
      </View>


      <View style={styles.nounContainer}>
        <View style={styles.inContainer}>
          <Text style={styles.noun}>adjective</Text>
          <View style={styles.line}></View>
        </View>
        <Text style={styles.meaning}>Meaning</Text>
        <FlatList data={data?.[2]?.definitions} renderItem={renderDefinition} />
      </View>


      <View style={styles.nounContainer}>
        <View style={styles.inContainer}>
          <Text style={styles.noun}>verb</Text>
          <View style={styles.line}></View>
        </View>
        <Text style={styles.meaning}>Meaning</Text>
        <FlatList data={data?.[1]?.definitions} renderItem={renderDefinition} />
      </View>


      <View style={styles.nounContainer}>
        <View style={styles.inContainer}>
          <Text style={styles.noun}>Source</Text>
          <View style={styles.line}></View>
        </View>
        <FlatList data={source} renderItem={renderSource} horizontal />
      </View>

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheet}>
          <View style={styles.actionView}>
            <TouchableOpacity onPress={getFavorites}  >
              <Text style={[styles.lastSearch, actionTitle && styles.activeTitle]}>Favori kelimeler</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={getSearchs} >
              <Text style={[styles.lastSearch, !actionTitle && styles.activeTitle]}>Son aramalar</Text>
            </TouchableOpacity>
          </View>
          {
            actionTitle
              ?
              <FlatList data={favorites} renderItem={renderFavorites} />
              :
              <FlatList data={searcsResult} renderItem={renderSearchResult} />

          }
        </View>
      </ActionSheet>
    </ScrollView>
  )
}

export default Home;
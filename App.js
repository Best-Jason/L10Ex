import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View} from 'react-native';

let originalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
    .then(response => {
        return response.json(); //return in json format
    })
    .then((myjson) => {
        if (originalData.length < 1)
        {
            setMydata(myjson); // mydata is myjson which from url data (this is data that changes)
            originalData = myjson;// originalData is myjson which from url data (there is 2 data that is using data from url)(this is used as default data)
        }
    })
  }, []);

  const filterData = (text) => {
      if (text != '') { //if data's title includes/has text from the search bar, it set the mydata to myFiltereddata which filtered originaldata without changing originaldata)
          let myFilteredData = originalData.filter((item) =>
          item.title.includes(text));
          setMydata(myFilteredData);
      }
      else{
          setMydata(originalData); //if nothing is added to search bar, it then uses original data
      }
  }

  const renderItem = ({item, index}) => {
    return (
    <View>
    <Text style={{borderWidth:1}}>{item.title}</Text>
    </View>
    );
  };

  return (
    <View>
      <StatusBar/>
      <Text>Search:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text) =>{filterData(text)}} placeholder="Search..." />
      <FlatList data={mydata} renderItem={renderItem} />
    </View>
  );
}

export default App;

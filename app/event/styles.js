import {StyleSheet} from 'react-native'
export default styles = StyleSheet.create({
  header:{
    backgroundColor:'#2fbdd2',
    flex:1,
    justifyContent: 'space-between',
    flexDirection:'row'
  },
  save: {
    fontWeight: 'bold',
    fontSize: 15,
    alignItems:'flex-end',
  },
  headerbuttons:{
    margin:20,
    marginTop:18,
    color:'white',
    fontSize:25,
  },
//////////////////////////////////////////////
  textinput:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  time:{
    marginRight:140,
    marginTop:5
  },
//tukaj je body del....
  items:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop:30,
    marginLeft:15,
    width:330,


  },
  icon:{
    fontSize: 30,
  }

});

import {StyleSheet} from 'react-native'

export default styles = {
  icon:{
    fontSize: 25,

  },
  about:{
    fontSize:20,
    color:'black',
  },
  index:{
    marginBottom:15,
  },
  textView:{
    marginTop:10,
    marginLeft:10,
  },
  notes:{
    fontWeight:'bold',
  },
  recordingView:{
    flexDirection:'row',
    borderBottomWidth:0.5,
    borderBottomColor:'black',
    marginTop:15
  },

  reminder:{
    flexDirection:'column',
    elevation:5,
    marginTop:30,
    backgroundColor:'white',
    height:200,

  },
  image:{
    height:130,
    resizeMode:'cover',
    zIndex:999
  },
  data:{
    height:70,
    flexDirection:'row',
    elevation:5
  },
  menu:{
    marginTop:35,
    position:'absolute',
    right:45
  },
  menuTrigger:{
    triggerText: {
      color: '#2fbdd2',
      fontWeight:'bold'
    },
  },
  type:{
    position:'absolute',
    right:10,
    top:0
  },
  free:{
    marginTop:30,
    height:300,
    width:400,
  }
}

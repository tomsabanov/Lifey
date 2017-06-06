import React, { Component } from 'react'
import {View, Text,TouchableOpacity} from 'react-native'
import {spremeniNapis} from 'file-path'
class Komponenta extends Component{
  render(){
    return(
      <View>
        <TouchableOpacity onPress={()=>this.props.spremeniNapis()}><Text>Klikni me da se spremeni napis</Text></TouchableOpacity>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}
import { connect } from 'react-redux'
const mapDispatchToProps = (dispatch, props) => ({
    spremeniNapis : () => {dispatch(spremeniNapis())},
})
const mapStateToProps = (state,props) => {
   return {
     text : state.text,
   }
};
export default connect(mapStateToProps,mapDispatchToProps)(Day)


function spremeniNapis(){
  return{
    type:"SPREMENINAPIS"
  }
}

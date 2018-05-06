/**
 * Sample
 * React
 * Native
 * App
 * https://github.com/facebook/react-native
 * @flow
 * Created
 *     by
 *     Administrator
 *     on
 *     2018/5/4.
 */

import React, { Component,PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  InteractionManager,
  TouchableOpacity,
  Image,
} from 'react-native';


export default class SelectEquipmentPageItem extends PureComponent{
  state={
    select:false,
  }
  render() {
    const {data,onPress}=this.props;
    const {select}=this.state;
    return (
      <TouchableOpacity
          style={{
              height:100,
              paddingLeft:40,
              paddingRight:15,
              backgroundColor:select?'#e3f0ff':'#fff',
              borderBottomColor:'#e5e5e5',
              borderBottomWidth:StyleSheet.hairlineWidth,
              justifyContent:'center'
          }}
          activeOpacity={0.7}
          onPress={()=>{
            this.setState({
              select:!this.state.select
            },()=>{
                if(this.state.select===true){
                    onPress()
                }else{
                    console.log('没有选中')
                }
            })
          }}
      >
          <View
              style={{
                width:18,
                height:18,
                borderColor:'#aeaeae',
                borderWidth:StyleSheet.hairlineWidth,
                position:'absolute',
                top:42,
                borderRadius:1,
                marginLeft:15,
                alignItems:'center',
                justifyContent:'center'
              }}
          >
              {
                select
                ?
                    <Image
                        source={require('../../../Icon/登陆页图标/SelectedBlue.png')}
                        style={{
                            width:15,
                            height:15,
                        }}
                    />
                :
                    <View></View>
              }
          </View>
          <View
              style={{
                  flexDirection:'row',
                  justifyContent:'space-between'
              }}
          >
              <View style={{flexDirection:'row'}}>
                <Text>资产编号:<Text style={{color:'#000'}}>{data.资产编号}</Text>  </Text>
              </View>
              <Text
                  style={{
                    fontSize:14,
                    color:'#000',
                    fontWeight:'600'
                  }}
              >{data.状态}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
              <Text>资产名称:<Text style={{color:'#000'}}>{data.资产名称}</Text>  </Text>
          </View>
          <View style={{flexDirection:'row'}}>
              <Text>资产分类:<Text style={{color:'#000'}}>{data.资产分类}</Text>  </Text>
          </View>
          <View style={{flexDirection:'row'}}>
              <Text>资产位置:<Text style={{color:'#000'}}>{data.资产位置}</Text>  </Text>
          </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

});

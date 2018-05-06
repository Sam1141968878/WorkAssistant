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
 *     2018/4/18.
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
  StatusBar,
  BackHandler
} from 'react-native';

import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import PublicHeader from '../PublicComponents/PublicHeader'
import PublicTopTab from '../PublicComponents/PublicTopTab'
import NewGlobalStore from "../../GlobalStore/GlobalStore";
var Spinner = require('react-native-spinkit');

@observer
export default class CapacityViewPage extends PureComponent{
  state={
    lazyLoading:true
  }
  componentDidMount() {
      setTimeout(()=>{
          this.setState({
              lazyLoading:false
          })
      },500)
      if (Platform.OS === 'android') {
          NewGlobalStore.RemoveBackHandler();
      }
  }
  componentWillUnmount() {
      if (Platform.OS === 'android') {
          NewGlobalStore.AddBackHandler();
      }
  }
  render() {
    const {goBack}=this.props;
    return (
      <View style={{flex:1}}>
          {
            this.state.lazyLoading
            ?
                <View
                    style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'#051843'
                    }}
                >
                    <Spinner
                        size={100}
                        color='lightslategrey'
                        type='9CubeGrid'
                    />
                </View>
            :
                <View
                    style={{flex:1}}
                >
                    <StatusBar
                        backgroundColor='rgba(0,0,0,0)'
                        translucent={true}
                    />
                    <PublicHeader
                        type='one'
                        Title='容量查看'
                        goBack={goBack}
                    />
                    {/*<PublicTopTab*/}
                        {/*OneTitle={'按分类'}*/}
                        {/*TwoTitle={'按位置'}*/}
                        {/*ThirdTitle={'按状态'}*/}
                        {/*Type={3}*/}
                    {/*/>*/}
                    <Image
                        source={require('../../Icon/公用图标/DevelopmentImg.png')}
                        style={{
                            width:200,
                            height:200,
                            marginLeft:90,
                            marginTop:100,
                        }}
                    />
                </View>
          }

      </View>
    );
  }
}

const styles = StyleSheet.create({

});

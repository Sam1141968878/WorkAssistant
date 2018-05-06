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
import FaultReportList from '../ListComponents/FaultReportList'
import NewGlobalStore from "../../GlobalStore/GlobalStore";
var Spinner = require('react-native-spinkit');

@observer
export default class FaultReportPage extends PureComponent{
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
  save=()=>{
    alert('保存成功')
  }
  render() {
    const {goBack,navigate}=this.props;
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
                  type='string'
                  Title='故障上报'
                  goBack={goBack}
                  RightText={'保存'}
                  function={this.save}
              />
              <FaultReportList navigate={navigate}/>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

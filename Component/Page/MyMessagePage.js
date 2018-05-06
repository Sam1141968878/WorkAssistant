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
 *     2018/4/26.
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
  ScrollView
} from 'react-native';

import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import NewGlobalStore from "../../GlobalStore/GlobalStore";

import PublicHeader from '../PublicComponents/PublicHeader'
import PublicTopTab from '../PublicComponents/PublicTopTab'
import MyMessagePageItem from '../PageComponents/MyMessagePage/MyMessagePageItem'
var Spinner = require('react-native-spinkit');

const MyMessageData=[
    {
        title:'通知1',
        state:'已读',
        time:'2017-11-11 09:58:10',
        object:'对象1',
        content:'内容1'
    },
    {
        title:'通知2',
        state:'未读',
        time:'2017-11-11 09:58:10',
        object:'对象2',
        content:'内容3'
    },
    {
        title:'通知3',
        state:'已读',
        time:'2017-11-11 09:58:10',
        object:'对象3',
        content:'内容3'
    },
    {
        title:'通知4',
        state:'未读',
        time:'2017-11-11 09:58:10',
        object:'对象4',
        content:'内容4'
    },
    {
        title:'通知5',
        state:'已读',
        time:'2017-11-11 09:58:10',
        object:'对象5',
        content:'内容5'
    },
    {
        title:'通知6',
        state:'未读',
        time:'2017-11-11 09:58:10',
        object:'对象6',
        content:'内容6'
    },
]

@observer
export default class MyMessagePage extends PureComponent{
  state={
    lazyLoading:true
  }
  componentDidMount() {
      setTimeout(()=>{
          this.setState({
              lazyLoading:false
          })
      },300)
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
    const {goBack}=this.props.navigation;
    return (
      <View
          style={{
            flex:1
          }}
      >
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
                        type='ThreeBounce'
                    />
                </View>
            :
                <ScrollView
                    style={{flex:1}}
                >
                  <StatusBar
                    backgroundColor='rgba(0,0,0,0)'
                    translucent={true}
                  />
                  <PublicHeader
                    type='one'
                    Title='通知'
                    goBack={()=>goBack()}
                  />
                  <View
                      style={{
                        flex:1,
                        backgroundColor:'#f5f5f9'
                      }}
                  >
                      {
                        MyMessageData.map((item,index)=>
                            <MyMessagePageItem
                                title={item.title}
                                state={item.state}
                                time={item.time}
                                object={item.object}
                                content={item.content}
                                key={index}
                            />
                        )
                      }
                  </View>
                </ScrollView>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

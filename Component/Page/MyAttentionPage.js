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
import MyAttentionOnePage from '../PageComponents/MyAttentionPage/MyAttentionOnePage'
import MyAttentionTwoPage from '../PageComponents/MyAttentionPage/MyAttentionTwoPage'
import MyAttentionThirdPage from '../PageComponents/MyAttentionPage/MyAttentionThirdPage'
import MyAttentionFourPage from '../PageComponents/MyAttentionPage/MyAttentionFourPage'
var Spinner = require('react-native-spinkit');


const PublicTopTabProps={
    OneTitle:'全部',
    TwoTitle:'待处理',
    ThirdTitle:'处理中',
    FourTitle:'待关闭',
    OnePage:<MyAttentionOnePage/>,
    TwoPage:<MyAttentionTwoPage/>,
    ThirdPage:<MyAttentionThirdPage/>,
    FourPage:<MyAttentionFourPage/>,
    Type:'Four',
}

@observer
export default class MyAttentionPage extends PureComponent{
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
                <View
                    style={{flex:1}}
                >
                    <StatusBar
                      backgroundColor='rgba(0,0,0,0)'
                      translucent={true}
                    />
                    <PublicHeader
                      type='two'
                      Title='我的关注'
                      goBack={()=>goBack()}
                    />
                    <PublicTopTab
                        {...PublicTopTabProps}
                    />
                </View>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

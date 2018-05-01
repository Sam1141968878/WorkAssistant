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
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class HomePageHeader extends PureComponent{
  render() {
    const {navigate}=this.props;
    return (
      <LinearGradient
          start={{x: 0.25, y: 0.75}} end={{x: 1.0, y: 0.0}}
          locations={[0.2,0.65,1]}
          colors={['#003278', '#052e6b', '#022762']}
          style={{
            width:'100%',
            height:140,
            elevation:-1
          }}>
          <Text
              style={{
                color:'#fefefe',
                fontSize:16,
                marginLeft:'45%',
                marginTop:25,
                position:'absolute'
              }}>首页</Text>
          <TouchableOpacity
              style={{
                width:50,
                height:60,
                position:'absolute',
                right:0,
                top:22,
              }}
              activeOpacity={0.6}
              onPress={()=>navigate('MyMessagePage')}
          >
              <Image
                  source={require('../../../Icon/首页图标/Mail.png')}
                  style={{
                    marginTop:5,
                    marginLeft:8,
                    width:20,
                    height:20,
                  }}
              />
              <View
                  style={{
                    width:18,
                    height:13,
                    borderRadius:6,
                    backgroundColor:'#e05141',
                    alignItems:'center',
                    justifyContent:'center',
                    position:'absolute',
                    top:1,
                    right:13,
                  }}>
                  <Text
                      style={{
                        fontSize:8,
                        fontWeight:'900',
                        color:'#fefefe'
                      }}>99+</Text>
              </View>
          </TouchableOpacity>
          <View
              style={{
                width:'90%',
                marginLeft:'5%',
                height:80,
                marginTop:58,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
              }}>
              <TouchableOpacity
                  style={{
                    width:80,
                    height:58,
                    alignItems:'center',
                    justifyContent:'space-between',
                    paddingBottom:10,
                    marginTop:10,
                  }}
                  activeOpacity={0.6}
                  onPress={()=>navigate('AwaitMeManagePage')}
              >
                  <Text
                      style={{
                        color:'#fefefe',
                        fontSize:20,
                      }}>0</Text>
                  <Text
                      style={{
                        color:'#fefefe',
                        fontSize:11,
                      }}>待我处理</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={{
                    width:80,
                    height:58,
                    alignItems:'center',
                    justifyContent:'space-between',
                    paddingBottom:10,
                    marginTop:10,
                  }}
                  activeOpacity={0.6}
                  onPress={()=>navigate('MyAttentionPage')}
              >
                  <Text
                      style={{
                        color:'#fefefe',
                        fontSize:20,
                      }}>0</Text>
                  <Text
                      style={{
                        color:'#fefefe',
                        fontSize:11,
                      }}>我的关注</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={{
                    width:80,
                    height:58,
                    alignItems:'center',
                    justifyContent:'space-between',
                    paddingBottom:10,
                    marginTop:10,
                  }}
                  activeOpacity={0.6}
                  onPress={()=>navigate('WarningPage')}
              >
                <Text
                      style={{
                        color:'#fefefe',
                        fontSize:20,
                      }}>0</Text>
                  <Text
                      style={{
                        color:'#fefefe',
                        fontSize:11,
                      }}>告警</Text>
              </TouchableOpacity>
          </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({

});

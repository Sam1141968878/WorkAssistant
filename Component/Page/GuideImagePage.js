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
  StatusBar,
  BackHandler,
} from 'react-native';

import Swiper from 'react-native-swiper';
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import NewGlobalStore from '../../GlobalStore/GlobalStore'

@observer
export default class GuideImagePage extends PureComponent{
  state={
    GuideImageState:false,
  }
  render() {
    return (
        <View
            style={{flex:1}}
        >
            {
                this.state.GuideImageState
                ?
                    null
                :
                    <View
                        style={{flex:1}}
                    >
                        <StatusBar
                            backgroundColor='rgba(0,0,0,0)'
                            translucent={true}
                        />
                        <Swiper
                          showsButtons={true}
                          loop={false}
                        >
                          <View
                              style={{
                                  alignItems:'center',
                                  justifyContent:'center',
                                  flex:1
                              }}
                          >
                            <Text style={styles.text}>我是引导图1</Text>
                          </View>
                          <View
                              style={{
                                  alignItems:'center',
                                  justifyContent:'center',
                                  flex:1
                              }}
                          >
                            <Text style={styles.text}>我是引导图2</Text>
                          </View>
                          <View
                              style={{
                                  alignItems:'center',
                                  justifyContent:'center',
                                  flex:1
                              }}
                          >
                            <View>
                                <Text style={styles.text}>我是引导图3</Text>
                                <TouchableOpacity
                                    style={{
                                        width:80,
                                        height:50,
                                        borderRadius:2,
                                        backgroundColor:'blue',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                    activeOpacity={0.7}
                                    onPress={()=>
                                        {
                                            this.setState({
                                                GuideImageState:true
                                            },()=>this.props.navigation.navigate('HomePage'))
                                        }
                                    }
                                >
                                    <Text>进入App</Text>
                                </TouchableOpacity>
                            </View>
                          </View>
                        </Swiper>
                    </View>
            }
        </View>

    );
  }
}

const styles = StyleSheet.create({

});

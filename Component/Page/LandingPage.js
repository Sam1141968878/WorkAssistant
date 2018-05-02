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
 *     2018/4/23.
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
  Dimensions,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import Overlay from 'teaset/components/Overlay/Overlay';
import NewGlobalStore from '../../GlobalStore/GlobalStore'
import fetchPost from '../../Function/FetchPost'

const Width=Dimensions.get('window').width;
const Height=Dimensions.get('window').height;

@observer
export default class LandingPage extends Component{
  state={
    user:'',
    passWord:'',
    PassWordHidden:false,
    saveUser:false,
    savePassWord:false,
    modalVisible:false,
    serverParameters:'',
    GlobalToken:'',
  }

  //设置弹出服务器设置的悬浮层
  overlayView = (
    <Overlay.PopView
      style={{alignItems: 'center', justifyContent: 'center'}}
      type='zoomIn'
      >
      <View
        style={{
        width:305,
        height:215,
        borderRadius: 10,
        borderColor:'#3087ef',
        borderWidth:2
        }}
      >
          <View
              style={{
                  alignItems:'center',
                  justifyContent:'center',
                  height:45,
                  backgroundColor:'#3087ef',
                  borderTopLeftRadius:7,
                  borderTopRightRadius:7,
              }}
          >
              <Text
                  style={{
                    color:'#FFF',
                    fontSize:16,
                  }}>服务器设置</Text>
          </View>
          <View
              style={{
                height:115,
                backgroundColor:'#1d4799'
              }}
          >
              <View
                  style={{
                    marginLeft:15,
                    marginRight:15,
                    marginTop:15,
                    marginBottom:15,
                    justifyContent:'space-between',
                    height:85
                  }}
              >
                  <Text
                      style={{
                        color:'#FFF',
                        fontSize:16,
                      }}
                  >服务器参数</Text>
                  <View
                      style={{
                        height:45,
                        backgroundColor:'#133371'
                      }}
                  >
                    <TextInput
                        maxLength={20}
                        placeholder='请输入服务器参数'
                        placeholderTextColor='#6d88af'
                        style={{
                            width:200,
                            color:'#FFF',
                            fontSize:16,
                        }}
                        selectionColor='#FFF'
                        defaultValue=''
                        onChangeText={(value)=>this.setState({
                            serverParameters:value
                        })}
                        underlineColorAndroid='transparent'
                    />
                  </View>
              </View>
          </View>
          <View
              style={{
                  flexDirection:'row',
              }}>
             <TouchableOpacity
                 style={{
                   borderColor:'#2b63a6',
                   borderWidth:1,
                   width:'50%',
                   height:52,
                   borderBottomLeftRadius:7,
                   backgroundColor:'#1d4799',
                   alignItems:'center',
                   justifyContent:'center',
                 }}
                 activeOpacity={0.8}
                 onPress={()=>{
                    Overlay.hide(overlayViewHide)
                 }}
             >
                 <Text
                     style={{
                        fontSize:16,
                        color:'#FFF'
                     }}
                 >取消</Text>
             </TouchableOpacity>
             <TouchableOpacity
                 style={{
                   borderColor:'#2b63a6',
                   borderWidth:1,
                   width:'50%',
                   height:52,
                   borderBottomRightRadius:7,
                   backgroundColor:'#1d4799',
                   alignItems:'center',
                   justifyContent:'center'
                 }}
                 activeOpacity={0.8}
                 onPress={()=>{
                    Overlay.hide(overlayViewHide)
                    action
                    NewGlobalStore.ServerParameters=this.state.serverParameters;
                    AsyncStorage.setItem('ServerParameters', JSON.stringify(NewGlobalStore.ServerParameters), (error, result) => {
                        if (!error) {
                            console.log('存储服务器设置成功')
                        }
                    })
                 }}
             >
                 <Text
                     style={{
                        fontSize:16,
                        color:'#FFF'
                     }}
                 >确定</Text>
             </TouchableOpacity>
          </View>
      </View>
    </Overlay.PopView>
  );

  _fetchLanding=()=>{
    const accessToken=fetchPost(`http://${this.state.serverParameters}/login`,
      {"uid": this.state.user, "pwd": this.state.passWord}
    )
    .then((accessToken)=>{
        console.log(accessToken)
        if(accessToken.errcode==='00000'){
            this.setState({
                GlobalToken:accessToken.access_token
            },()=>{
                 action
                 NewGlobalStore.LandingState=true;
                 action
                 NewGlobalStore.User=this.state.user;
                 action
                 NewGlobalStore.PassWord=this.state.passWord;
                 action
                 NewGlobalStore.GlobalToken=this.state.GlobalToken;

                 AsyncStorage.setItem('LandingState', JSON.stringify(NewGlobalStore.LandingState), (error, result) => {
                     if (!error) {
                         console.log('存储登陆状态成功')
                     }
                 })
                 AsyncStorage.setItem('User', JSON.stringify(NewGlobalStore.User), (error, result) => {
                     if (!error) {
                         console.log('存储用户名字成功')
                     }
                 })
                 AsyncStorage.setItem('PassWord', JSON.stringify(NewGlobalStore.PassWord), (error, result) => {
                     if (!error) {
                         console.log('存储用户密码成功')
                     }
                 })

                 AsyncStorage.setItem('GlobalToken', JSON.stringify(NewGlobalStore.GlobalToken), (error, result) => {
                     if (!error) {
                         console.log('存储全局Token成功')
                     }
                 })
                     this.props.navigation.navigate('HomePage')
            })
        }else if(accessToken.errcode==='00001'){
            alert('错误的账号或密码')
        }else{
            alert('登陆失败,请检查你的服务器配置')
        }

    })
  }

  render() {
    const {
        user,
        passWord,
        PassWordHidden,
        saveUser,
        savePassWord,
    }=this.state;
    return (
      <View style={{flex:1}}>
          <View
              style={{flex:1}}
          >
              <StatusBar
                  backgroundColor='rgba(0,0,0,0)'
                  translucent={true}
              />
              <Image
                  source={require('../../Img/LandingBackground.png')}
                  style={{
                      width:Width,
                      height:Height,
                      position:'absolute'
                  }}
              />
              <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                      position:'absolute',
                      right:0,
                      top:35,
                      width:40,
                      height:40
                  }}
                  onPress={()=>{overlayViewHide=Overlay.show(this.overlayView)}}
              >
                  <Image
                      source={require('../../Icon/登陆页图标/SetUp.png')}
                      style={{
                          width:20,
                          height:20,
                      }}
                  />
              </TouchableOpacity>
                <View
                    style={{
                      alignItems:'center',
                      marginTop:170,
                    }}
                >
                    <Text
                        style={{
                          fontSize:23,
                          color:'#FFF'
                        }}
                    >云运维</Text>
                </View>
                <View
                    style={{
                      marginLeft:45,
                      marginRight:45,
                      height:110,
                      marginTop:35,
                      justifyContent:'space-between'
                    }}
                >
                    <View
                        style={{
                          height:50,
                          backgroundColor:'rgba(19,51,106,0.6)',
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingLeft:25,
                          paddingRight:20,
                        }}
                    >
                      <TextInput
                          // autoFocus={true}
                          maxLength={10}
                          placeholder='请输入你的账号'
                          placeholderTextColor='#FFF'
                          style={{
                              width:200,
                              color:'#FFF',
                              fontSize:16,
                          }}
                          onChangeText={(text) => this.setState({
                              user:text
                          })}
                          selectionColor='#FFF'
                          value={user}
                          underlineColorAndroid='transparent'
                      />
                      <TouchableOpacity activeOpacity={0.6}>
                          <Image
                              source={require('../../Icon/登陆页图标/ShutDown.png')}
                              style={{
                                  width:20,
                                  height:20
                              }}
                          />
                      </TouchableOpacity>
                    </View>
                    <View
                        style={{
                          height:50,
                          backgroundColor:'rgba(19,51,106,0.6)',
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingLeft:25,
                          paddingRight:20,
                        }}
                    >
                      <TextInput
                          maxLength={10}
                          placeholder='请输入你的密码'
                          placeholderTextColor='#FFF'
                          style={{
                              width:200,
                              color:'#FFF',
                              fontSize:16,
                          }}
                          onChangeText={(text) => this.setState({
                              passWord:text
                          })}
                          selectionColor='#FFF'
                          value={passWord}
                          underlineColorAndroid='transparent'
                          secureTextEntry={PassWordHidden?false:true}
                      />
                      <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={()=>this.setState({
                              PassWordHidden:!PassWordHidden
                          })}
                      >
                          {
                              PassWordHidden
                              ?
                              <Image
                                  source={require('../../Icon/登陆页图标/Show.png')}
                                  style={{
                                      width:20,
                                      height:20
                                  }}
                              />
                              :
                              <Image
                                  source={require('../../Icon/登陆页图标/Hidden.png')}
                                  style={{
                                      width:20,
                                      height:20
                                  }}
                              />
                          }
                      </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        marginLeft:90,
                        marginRight:90,
                        flexDirection:'row',
                        height:20,
                        justifyContent:'space-between',
                        marginTop:18,
                    }}
                >
                    <TouchableOpacity
                        style={{
                          flexDirection:'row',
                          alignItems:'center'
                        }}
                        onPress={()=>this.setState({
                            saveUser:!saveUser
                        })}
                        activeOpacity={0.7}
                    >
                      <View
                          style={{
                              width:15,
                              height:15,
                              borderRadius:2,
                              backgroundColor:'rgba(17,48,104,0.7)',
                              borderWidth:StyleSheet.hairlineWidth,
                              borderColor:'#71abff',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {
                              saveUser
                              ?
                                  <Image
                                      style={{
                                          width:20,
                                          height:20,
                                      }}
                                      source={require('../../Icon/登陆页图标/SelectedBlue.png')}
                                  />
                              :
                                  <View/>
                          }

                      </View>
                      <Text
                          style={{
                              color:'#FFF',
                              marginLeft:5,
                          }}
                      >保存账号</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                          flexDirection:'row',
                          alignItems:'center'
                        }}
                        onPress={()=>this.setState({
                            savePassWord:!savePassWord
                        })}
                        activeOpacity={0.7}
                    >
                      <View
                          style={{
                              width:15,
                              height:15,
                              borderRadius:2,
                              backgroundColor:'rgba(17,48,104,0.7)',
                              borderWidth:StyleSheet.hairlineWidth,
                              borderColor:'#71abff',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {
                              savePassWord
                              ?
                                  <Image
                                      style={{
                                          width:20,
                                          height:20,
                                      }}
                                      source={require('../../Icon/登陆页图标/SelectedBlue.png')}
                                  />
                              :
                                  <View/>
                          }

                      </View>
                      <Text
                          style={{
                              color:'#FFF',
                              marginLeft:5,
                          }}
                      >保存密码</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                      marginLeft:45,
                      marginRight:45,
                      backgroundColor:'rgba(48,135,239,0.8)',
                      height:50,
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:25,
                      marginTop:20
                    }}
                    activeOpacity={0.8}
                    onPress={()=>{
                        this._fetchLanding()
                    }}
                >
                    <Text
                        style={{
                          fontSize:18,
                          color:'#FFF'
                        }}
                    >登陆</Text>
                </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});

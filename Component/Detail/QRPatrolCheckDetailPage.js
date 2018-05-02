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
  TextInput,
  ScrollView
} from 'react-native';

import PublicHeader from '../PublicComponents/PublicHeader'
import Checkbox from 'teaset/components/Checkbox/Checkbox';

export default class QRPatrolCheckDetailPage extends PureComponent{
  state={
    normal:true,
    Editor:false,
    noteValue:'',
  }
  render() {
    const {state,navigate,goBack}=this.props.navigation;

    return (
      <ScrollView
        style={{
            flex:1,
            backgroundColor:'#f5f5f9'
        }}
      >
        <StatusBar
            backgroundColor='rgba(0,0,0,0)'
            translucent={true}
        />
        <PublicHeader
            type='third'
            Title='巡检单'
            goBack={()=>navigate('HomePage')}
        />
        <View
            style={{
                flex:1,
                backgroundColor:'#f5f5f9'
            }}>
            <View
                style={{
                    marginLeft:10,
                    marginRight:10,
                    backgroundColor:'#FFF',
                    borderRadius:3,
                    height:70,
                    justifyContent:'center',
                    paddingLeft:20,
                    marginTop:10,
                }}>
                <Text
                    style={{
                         lineHeight:25,
                         color:'#000',
                    }}>开始时间:未获取到开始时间</Text>
                    {/*{startTime?startTime:'未获取到开始时间'}*/}
                <Text
                    style={{
                         lineHeight:25,
                         color:'#000',
                    }}>结束时间:未获取到结束时间</Text>
                    {/*{endTime?endTime:'未获取到结束时间'}    */}
            </View>
            <View
                style={{
                    marginLeft:10,
                    marginRight:10,
                    backgroundColor:'#FFF',
                    borderRadius:3,
                    marginTop:10,
                    height:330
                }}>
                <View
                    style={{
                        width:'88%',
                        marginLeft:20,
                        height:40,
                        borderBottomColor:'#e5e5e5',
                        borderBottomWidth:StyleSheet.hairlineWidth,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                    <Text
                        style={{
                            fontSize:16,
                            color:'#000'
                        }}>巡检任务内容</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            width:80,
                            height:50,
                        }}
                        onPress={()=>{
                            this.setState({
                                Editor:!this.state.Editor
                            })
                        }}
                    >
                        <Image
                            source={require('../../Icon/巡检页图标/EditorBlue.png')}
                            style={{
                                width:17,
                                height:17,
                                marginRight:10,
                                marginLeft:10,
                            }}
                        />
                        <Text
                            style={{
                                color:'#5ea0ef',
                                fontWeight:'500'
                            }}>编辑</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        marginLeft:20,
                        marginRight:20
                    }}>
                    <Text
                        style={{
                            lineHeight:35,
                        }}>区域:未获取到区域</Text>
                        {/*{area?area:'未获取到区域'}*/}
                    <Text
                        style={{
                            lineHeight:35,
                        }}>设备名称:未获取到设备名称</Text>
                        {/*{deviceName?deviceName:'未获取到设备名称'}*/}
                    <Text
                        style={{
                            lineHeight:35,
                        }}>巡检内容:未获取到巡检内容</Text>
                        {/*{patrolCheckContent?patrolCheckContent:'未获取到巡检内容'}*/}
                    <Text
                        style={{
                            lineHeight:35,
                        }}>参考值:未获取到参考值</Text>
                        {/*{referenceValue?referenceValue:'未获取到参考值'}*/}
                    <View
                        style={{
                            flexDirection:'row'
                        }}>
                        <Text
                        style={{
                            lineHeight:35,
                        }}>巡检值:未获取到巡检值</Text>
                        {/*{objectType?objectType:'未获取到巡检值'}*/}
                    </View>
                    <View
                        style={{
                            flexDirection:'row'
                        }}
                    >
                        <Text
                        style={{
                            lineHeight:35,
                        }}>巡检结果:</Text>
                        <Checkbox
                            checkedIcon={require('../../Icon/巡检页图标/SelectBlueXj.png')}
                            checkedIconStyle={{
                                width:18,
                                height:18,
                            }}
                            uncheckedIcon={require('../../Icon/巡检页图标/SelectGrayXJ.png')}
                            uncheckedIconStyle={{
                                width:18,
                                height:18,
                            }}
                            activeOpacity={0.7}
                            title='正常'
                            defaultChecked={true}
                            checked={this.state.normal}
                            onChange={checked => this.setState({
                                normal:checked
                                })
                            }
                            style={{
                                marginLeft:10,
                                marginRight:25
                            }}
                        />
                        <Checkbox
                            checkedIcon={require('../../Icon/巡检页图标/SelectBlueXj.png')}
                            checkedIconStyle={{
                                width:18,
                                height:18,
                            }}
                            uncheckedIcon={require('../../Icon/巡检页图标/SelectGrayXJ.png')}
                            uncheckedIconStyle={{
                                width:18,
                                height:18,
                            }}
                            activeOpacity={0.7}
                            title='异常'
                            defaultChecked={false}
                            checked={!this.state.normal}
                            onChange={checked => this.setState({
                                normal:!checked
                                })
                            }
                        />
                        {/*{status?status:'未获取到巡检结果'}*/}
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center'
                        }}
                    >
                        <Text
                        style={{
                            lineHeight:35,
                        }}>备注:</Text>
                        <View>
                            <TextInput
                                value={this.state.noteValue}
                                style={{width:250}}
                                editable={this.state.Editor}
                                multiline={true}
                                onChangeText={(value)=>{
                                    this.setState({
                                        noteValue:value
                                    })
                                }}
                                placeholder="暂无备注"
                            />
                        </View>
                        {/*{remark?remark:'暂无备注'}*/}
                    </View>

                </View>
            </View>
            <View
                style={{
                    flexDirection:'row',
                    marginLeft:15,
                    marginRight:15,
                    justifyContent:'space-around',
                    marginTop:20,
                }}>
                <TouchableOpacity
                    style={{
                        width:150,
                        height:45,
                        backgroundColor:'#358aef',
                        borderRadius:25,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                    activeOpacity={0.6}
                >
                    <Text>提交</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width:150,
                        height:45,
                        backgroundColor:'#e6e6e6',
                        borderRadius:25,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                    activeOpacity={0.6}
                    onPress={()=>navigate('HomePage')}
                >
                    <Text>取消</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});

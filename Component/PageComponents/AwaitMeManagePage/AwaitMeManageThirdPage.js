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
 *     2018/4/27.
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
  ScrollView
} from 'react-native';

const AwaitMeManageThirdPageData=[
    {
        title:'标题1',
        state:'处理中',
        content:'内容1',
        type:'某某类型',
        startTime:'2017-11-11 09:58:10',
        endTime:'2017-11-11 10:58:10'
    },
    {
        title:'标题2',
        state:'处理中',
        content:'内容2',
        type:'某某类型',
        startTime:'2017-11-11 09:58:10',
        endTime:'2017-11-11 10:58:10'
    },
    {
        title:'标题3',
        state:'处理中',
        content:'内容3',
        type:'某某类型',
        startTime:'2017-11-11 09:58:10',
        endTime:'2017-11-11 10:58:10'
    },
    {
        title:'标题4',
        state:'处理中',
        content:'内容4',
        type:'某某类型',
        startTime:'2017-11-11 09:58:10',
        endTime:'2017-11-11 10:58:10'
    },
    {
        title:'标题5',
        state:'处理中',
        content:'内容5',
        type:'某某类型',
        startTime:'2017-11-11 09:58:10',
        endTime:'2017-11-11 10:58:10'
    },
    {
        title:'标题6',
        state:'处理中',
        content:'内容6',
        type:'某某类型',
        startTime:'2017-11-11 09:58:10',
        endTime:'2017-11-11 10:58:10'
    },

]

import AwaitMeManagePageItem from './AwaitMeManagePageItem'
export default class AwaitMeManageThirdPage extends PureComponent{
  render() {
    return (
      <ScrollView
        style={{
            marginTop:10,
          }}
      >
            {
                AwaitMeManageThirdPageData.map((item,index)=>
                    <AwaitMeManagePageItem
                        title={item.title}
                        state={item.state}
                        content={item.content}
                        type={item.type}
                        startTime={item.startTime}
                        endTime={item.endTime}
                        key={index}
                    />
                )
            }
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});

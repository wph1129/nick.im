import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    BackAndroid,
    NavigationExperimental
} from 'react-native';

const {
    Header: NavigationHeader,
    CardStack: NavigationCardStack,
    StateUtils: NavigationStateUtils
} = NavigationExperimental;

import StaticContainer from './StaticContainer.js';

export default class Navigator extends Component{

      state:Object;
      _componentStack:Array<Object>;

      static defaultProps = {
          hackBackAndroid:true,
          isShowHeader:true
      }
      consructor(props:Object){
         super(props);

         //导航栈
         this.state = {
             stack:{
                 index:0,
                 routes:[
                     {
                        key:'0',
                        title:props.initialComponent.NavigationTitle || '',
                        isShowHeader : props.isShowHeader,
                        renderRightComponent:()=>{null;}
                     }
                 ]
             }
         };

        //组件栈
        this._componentStack = [
            props.initialComponent
        ];

      }

      setNavigationTitle = (title:String) =>{
        let stack = this.state.stack;
        stack.routes[stack.index].title = title;
        this.setState({
            stack:stack
        });
      }

      setRenderRightComponent = (renderRightComponent: function) =>{
         let stack = this.state.stack;
         stack.routes[stack.index].renderRightComponent = renderRightComponent;
         this.setState({
             stack:stack
         });
      }
      
     toogleNavigationHeader = () =>{
        let stack = this.state.stack;
        stack.routes[stack.index].isShowHeader = !stack.routes[stack.index].isShowHeader;
        this.setState({
            stack:stack
        });
    }
}

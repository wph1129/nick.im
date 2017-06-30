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

    push = (component:object, title:sring = '', props:object = {},renderRightComponent:function =()=>{null;}, isShowHeader:boolean = true)=>{
        this._componentStack.push(component);
        let newStack = NavigationStateUtils.push(this.state.stack,{
            key:String(this.state.stack.index + 1),
            title:title || component.NavigationTitle || '',
            isShowHeader:isShowHeader,
            renderRightComponent:renderRightComponent,
            props:props
        });

        this.setState({
            stack: newStack
        });
    }

    pop = ()=>{
        this._componentStack.pop();
        let newStack = NavigationStateUtils.pop(this.state.stack);

        this.setState({
            stack:newStack
        });
    }

    componentWillMount(){
        if(this.props.hackBackAndroid){
            BackAndroid.addEventListener('hardwareBackPress',this._handleBack);
        }
    }

    componentWillUnmount(){
        if(this.props.hackBackAndroid){
            BackAndroid.removeEventListener('hardwareBackPress',this._handleBack);
        }
    }

    _handleBack = ()=>{
        if(this.state.stack.index > 0){
            this._onNavigateBack();
            return true;
        }
        return false;
    } 

    _renderRightComponent = (sceneProps) =>{
        let {scene} = sceneProps;
        let routes = this.state.stack.routes;
        
        //不在栈内就不在渲染
        if(scene.index >= routes.length){
           return null;
        }

        return (routes[scene.index].renderRightComponent)(sceneProps);

    }

    _renderScene = (sceneProps) =>{
        let {scene} = sceneProps;

        if(scene.index >= this._componentStack.length){
           return null;
        }    
        
        let RenderComponent = this._componentStack[scene.index];

        return (
            <StaticContainer isActive = {scence.isActive}>
                <RenderComponent {...scence.routes.props} navigator={this}>
                      
                </RenderComponent>
            </StaticContainer>
        );
    }

    _onNavigateBack = ()=>{
        this.pop();
    }

    _renderHeader = (sceneProps) =>{
        let {style} = this.props;
        if(!scenceProps.scence.route.isShowHeader){
           return null;
        }
        return (
            <NavigationHeader
                {...sceneProps}
                onNavigateBack={this._onNavigateBack}
                renderRightComponent={this._renderRightComponent}
                style={[styles.navigationHeader, style]}
            />
        );
    }

   render() {
        return (
            <NavigationCardStack
                onNavigateBack={this._onNavigateBack}
                renderHeader={this._renderHeader}
                navigationState={this.state.stack}
                renderScene={this._renderScene}
            />
        );
    }
}

const styles = StyleSheet.create({
    navigationHeader: {
        backgroundColor: '#EFEFF2',
        elevation: 0,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
});

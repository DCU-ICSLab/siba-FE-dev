import React, { Component, Fragment } from 'react';
import { MdAdd } from 'react-icons/md'
import './TextBox.css';
import TimeTextBox from './TimeTextBox';
import ButtonTextBox from './ButtonTextBox';
import EntryTextBox from './EntryTextBox';
import DynamicTextBox from './DynamicTextBox';
//import EndBox from './EndBox';

//dumb 컴포넌트지만 rendering 최적화를 위해 class로 구성
class TextBox extends Component {

    //렌더링 최적화
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.boxInfo !== this.props.boxInfo;
    }

    render() {

        const { boxInfo, dragStart, dropSwap, tempBox, index, addBtnFunc, focus, isEvent, isSelect} = this.props;
        const type = boxInfo.get('type')
        return (
            <Fragment>
                {type === 1 && 
                <ButtonTextBox 
                isSelect={isSelect}
                boxInfo={boxInfo}
                dragStart={dragStart}
                dropSwap={dropSwap}
                tempBox={tempBox}
                index={index}
                addBtnFunc={addBtnFunc}
                focus={focus}
                isEvent={isEvent}/>}
                {type === 2 && 
                <DynamicTextBox
                isSelect={isSelect}
                boxInfo={boxInfo}
                dragStart={dragStart}
                dropSwap={dropSwap}
                tempBox={tempBox}
                index={index}
                addBtnFunc={addBtnFunc}
                focus={focus}
                isEvent={isEvent}/>}
                {type === 3 && 
                <TimeTextBox
                isSelect={isSelect}
                boxInfo={boxInfo}
                dragStart={dragStart}
                dropSwap={dropSwap}
                tempBox={tempBox}
                index={index}
                addBtnFunc={addBtnFunc}
                focus={focus}
                isEvent={isEvent}/>}
                {type === 5 && 
                <EntryTextBox 
                isSelect={isSelect}
                boxInfo={boxInfo}
                dragStart={dragStart}
                dropSwap={dropSwap}
                tempBox={tempBox}
                index={index}
                addBtnFunc={addBtnFunc}
                focus={focus}
                isEvent={isEvent}/>}
                {/* {type === 6 && 
                <EndBox
                boxInfo={boxInfo}
                dragStart={dragStart}
                dropSwap={dropSwap}
                tempBox={tempBox}
                index={index}
                addBtnFunc={addBtnFunc}
                focus={focus}/>} */}
            </Fragment>
        )
    }
}

export default TextBox;
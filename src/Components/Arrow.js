import React from 'react';
import styled from 'styled-components';

const ArrowLine = styled.div`
    position: absolute;
    top: ${props => `${props.offset.top}px`};
    left: ${props => `${props.offset.left}px`};
    width: ${props => `${props.diagLength}px`};
    height: 5px;
    background-color: palevioletred;
    z-index: 1;
    transform: ${props => `rotate(-${props.angle}deg)`};
    transform-origin: left top;
    border-radius: 125px;
    display: flex;
    justify-content: row-reverse;
`

const ArrowLineInside = styled.div`
    position: absolute;
    left: ${props => `${props.diagLength}px`};
`

const RightArrow = styled.div`
    left: -1px;
    height: 5px;
    position: absolute;
    width: 20px;
    background-color: palevioletred;
    transform: rotate(145deg);
    transform-origin: left;
    border-radius: 125px;
`

const LeftArrow = styled.div`
    height: 5px;
    left: -1px;
    position: absolute;
    width: 20px;
    background-color: palevioletred;
    transform: rotate(215deg);
    transform-origin: left;
    border-radius: 125px;
`

// const StyledSvg = styled.svg`
//     height: 5px;
//     width: ${props => `${props.diagLength}px`};
//     position: absolute;
//     left: ${props => `${props.offset.left}px`};
//     top: ${props => `${props.offset.top}px`};
//     z-index: 5;
//     transform: ${props => `rotate(-${props.angle}deg)`};
//     transform-origin: left top;
//     background-color: black;
// `

class Arrow extends React.Component {

    render() {
        const { arrow } = this.props
        return(
            <ArrowLine diagLength={arrow.diagLength} offset={arrow.offset} angle={arrow.angle}> 
                <ArrowLineInside diagLength={arrow.diagLength}>
                    <LeftArrow />
                    <RightArrow />
                </ArrowLineInside>
            </ArrowLine>
            // <StyledSvg offset={arrow.offset} diagLength={arrow.diagLength} angle={arrow.angle}>
            // {/*     <line x1={0} y1={0} x2={100} y2={100} style={{stroke:'rgb(255,0,0)', strokeWidth:2}}></line>*/}
            // </StyledSvg>
        )
    }
}


export default Arrow
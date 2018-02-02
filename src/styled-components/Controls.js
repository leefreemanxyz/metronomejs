import styled from 'styled-components'

export const MetronomeWrapper = styled.div`
    height:100vh;
    width: 100vw;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    background-color: #dedede;
`

export const PlaybackControls = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`
export const InputControlContainer = styled.div`
    display:flex;
    flex-direction: ${props => props.direction ? "column" : "row"};
    justify-content: space-between;
    align-items:center;
`
export const MinusControl = styled.div`
    content: "–";
    height: 20px;
    width: 20px;
    color: "yellow"
`
export const PlusControl = styled.div`
    content: "+"
`
export const BeatMarker = styled.div`
    height:50px;
    width:calc(100vw /  ${props => props.meter} - 20px);
    min-width: 2px;
    margin:5px;


`
export const BeatMarkerContainer = styled.div`
    display:flex;
    flex-direction:row;
`
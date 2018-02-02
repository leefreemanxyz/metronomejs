import React, { Component } from 'react';
import * as Tone from 'tone';

import {MetronomeWrapper, BeatMarker, PlaybackControls, InputControlContainer, MinusControl, PlusControl, BeatMarkerContainer} from './styled-components/Controls'

const options = {
  oscillaor: {
    type: 'triangle'
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 0.05
  }
}

const synth = new Tone.Synth(options).toMaster()


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      bpm: 120,
      playing: false,
      meter: 4,
      counter: 0,
      accentedPitch: 7,
      unaccentedPitch: 0
    }

    const notes = [
      "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
    ]
    const loop = new Tone.Loop((time)=>{
      synth.triggerAttackRelease(`${this.state.counter % this.state.meter ? notes[this.state.unaccentedPitch] : notes[this.state.accentedPitch]}3`, "16n", time)
      Tone.Draw.schedule(()=>{
        this.setState({counter: this.state.counter + 1})
      })
      console.log('boop')
    }, `${this.state.meter}n`)
    loop.start()
  }
  startMetronome = () => {
    this.setState({
      playing: true
    })

    Tone.Transport.start();
  }
  stopMetronome = () => {
    this.setState({
      playing:false,
      counter: 0
    })
    Tone.Transport.stop()
  }
  pauseMetronome = () => {
    this.setState({
      playing: false
    })

    Tone.Transport.stop()
  }
  changeTempo = (e) => {
    this.setState({
      bpm: e.target.value
    })
    Tone.Transport.bpm.rampTo(e.target.value, 4);
  }
  incrementMeter = () => {
    this.setState((prevState) => ({
      meter: prevState.meter + 1
    }))
  }
  decrementMeter = () => {
    this.setState((prevState)=>({
      meter: prevState.meter - 1
    }))
  }
  changeMeter = (e) => {
    this.setState({
      meter: Number(e.target.value),
      playing:false,
      counter:0
    })
    Tone.Transport.stop()
  }
  changeAccentedPitch = (e) => {
    this.setState({
      accentedPitch: e.target.value
    })
  }
  changeUnaccentedPitch = (e) => {
    this.setState({
      unaccentedPitch: e.target.value
    })
  }
  render() {
    return (
      <MetronomeWrapper>
        <BeatMarkerContainer>
      {[...Array(this.state.meter)].map((beat, index)=>{
        return <BeatMarker key={index} meter={this.state.meter} style={{backgroundColor: (this.state.counter % this.state.meter) === ((index + 1) % this.state.meter) ? 'yellow':'grey'}}/>
                })}
                </BeatMarkerContainer>
      <InputControlContainer direction>
      <input type="range" min="40" max="220" value={this.state.bpm} onChange={this.changeTempo}/>
      <span>{this.state.bpm} BPM</span>
      </InputControlContainer>
      <InputControlContainer direction>
      <input type="range" min="0" max="11" value={this.state.accentedPitch} onChange={this.changeAccentedPitch}/>
      </InputControlContainer>
      <InputControlContainer direction>
      <input type="range" min="0" max="11" value={this.state.unaccentedPitch} onChange={this.changeUnaccentedPitch}/>
      </InputControlContainer>
      <InputControlContainer>
      <MinusControl onClick={this.decrementMeter}>–</MinusControl>
      <label htmlFor="meter">Meter</label>
      <input id="meter" min="1" max="16" type="number" value={this.state.meter} onChange={this.changeMeter}/>
      <PlusControl onClick={this.incrementMeter}>+</PlusControl>
      </InputControlContainer>
      <PlaybackControls>
      <button onClick={this.state.playing ? this.pauseMetronome : this.startMetronome}>
      {this.state.playing ? "||" : ">" }
      </button>
      <button onClick={this.stopMetronome} disabled={!this.state.playing}>Stop</button>
      </PlaybackControls>
      </MetronomeWrapper>
    );
  }
}

export default App;

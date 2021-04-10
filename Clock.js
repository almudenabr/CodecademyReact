import React from 'react';

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  render() {
    return (
      <div>
        {this.props.isPrecise
          ? this.state.date.toISOString() // displays full detail date
          : this.state.date.toLocaleTimeString()} // displays local date
      </div>
    );
  }

  //method with the code for setting up the interval
  startInterval(){
    let delay;
    if(this.props.isPrecise){
      delay = 100; //to update time every 100 milliseconds - in case of ISOString
    }else{
      delay = 1000; // to update time every 1000 milliseconds in case LocaleTimeString
    }
    this.intervalID = setInterval(() => {
      this.setState({date: new Date()})
    }, delay)
  }

  // when the component mounts  
  componentDidMount() {
    this.startInterval();
  }

  //when the component updates
  componentDidUpdate(prevProps){
    if(this.props.isPrecise === prevProps.isPrecise){
      return;
    }
    clearInterval(this.intervalID);
    this.startInterval();
    
  }

   //when the component unmounts
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
}

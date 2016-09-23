import React from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';


Resolutions = new Mongo.Collection("resolutions");

export default class App extends React.Component {
    addResolution(event){
        event.preventDefault();
        let text = this.refs.resolution.value.trim();
        Resolutions.insert({
            text: text,
            complete: false,
            createdAt: new Date()
        });
        this.refs.resolution.value = "";
        // console.log(text);
    }

    render(){
        let res = this.props.resolutions;
        if (res.length < 1) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                <h1>My Resolutions</h1>
                <form className='new-resolution' onSubmit={this.addResolution.bind(this)}>
                <input type='text' ref={(ref) => this._resolution = ref} placeholder='finish series' />
                </form>
                <div>
                {res[0].text}
                </div>
                </div>
            );
        }
    }
}

export default createContainer(() => {
  return {
    'resolutions': Resolutions.find().fetch()
  };
}, App);

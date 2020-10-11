import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            {name: 'Max', age: 8},
            {name: 'Grant', age: 6}
        ]
    }

    switchNameHandler = (newName) => {
        this.setState({persons: [
            {name: 'Maxwell', age: 24},
            {name: newName, age: 26}
        ]})
    }

    nameChangeHandler = (event )=> {
        this.setState({
            persons: [
                {name: event.target.value, age: 24},
                {name: 'Grant :D', age: 26}
            ]
        })
    }
    render() {

        const style = {
            //this is js, NOT css
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        }
        return (
            <div className="App">
                <h1>Hi! I am a react app!!</h1>
                <Person name={this.state.persons[0].name} change={this.nameChangeHandler}/>
                {/*Anonymous functions like this are less efficient, better to us the bind methodology*/}
                <Person name="Jesse" click={() => this.switchNameHandler("grant")}/>
                <Person name={this.state.persons[1].name} click={this.switchNameHandler.bind(this, "Lightning Thunder")}>I like geckos</Person>
                {/*passing function by reference so note no () on switchNameHandler. It would execute right away if we did that
                Also note capitalized C in onClick, unlike usual*/}
                <button
                    style={style}
                    onClick={this.switchNameHandler.bind(this, 'Grant-eous')}>Click Me</button>
            </div>
        );
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
}

export default App;

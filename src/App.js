import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            {id: 1, name: 'Max', age: 8},
            {id: 2, name: 'Grant', age: 6},
            {id: 3, name: 'Kenzie', age: 6}
        ],
        otherstate: 'some other value',
        showPersons: false
    }

    switchNameHandler = (newName) => {
        this.setState({
            persons: [
                {name: 'Maxwell', age: 24},
                {name: newName, age: 26}
            ]
        })
    }

    nameChangeHandler = (event) => {
        this.setState({
            persons: [
                {name: event.target.value, age: 24},
                {name: 'Grant :D', age: 26}
            ]
        })
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        // setState does not overwrite, just merges
        this.setState({showPersons: !doesShow})
    }

    deletePersonsHandler = (personIndex) => {
        // remember this creates a pointer named persons to the state.persons
        // But this is bad practice. It is better to create a copy
        // const persons = this.state.persons;

        // ALWAYS change state in an immutable fashion, without mutating the original state.

        // this creates a copy, slice with no arguments
        // const persons = this.state.persons.slice();

        // Or the spread operator also makes a copy, this is more modern
        const persons = [...this.state.persons];

        persons.splice(personIndex, 1);
        this.setState({persons: persons});
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
        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            // You could do this with the anonymous function like so, or with the bind method
                            click={() => this.deletePersonsHandler(index)}
                            name={person.name}
                            age={person.age}
                            // key is required/expected when generating lists, so react can render them more efficiently
                            // usually it is the id for the db row, but it can be anything unique
                            key ={person.id}/>
                    })}
                    <Person name="Jesse from the ifs!" click={() => this.switchNameHandler("grant")}/>
                </div>
            );
        }
        return (
            <div className="App">
                <h1>Hi! I am a react app!!</h1>
                {/*Ternary if statement, if blocks will not work.
                so this is if showPersons ? the display them : else null  */}
                {this.state.showPersons ?
                    <div>
                        <Person name={this.state.persons[0].name} change={this.nameChangeHandler}/>
                        {/*Anonymous functions like this are less efficient, better to us the bind methodology*/}

                        <Person name={this.state.persons[1].name}
                                click={this.switchNameHandler.bind(this, "Lightning Thunder")}>I like geckos</Person>
                        {/*passing function by reference so note no () on switchNameHandler. It would execute right away if we did that
                Also note capitalized C in onClick, unlike usual*/}
                    </div> : null}
                {/*This was contionally assigned with the let persons higher up*/}
                {persons}
                <button
                    style={style}
                    // onClick={this.switchNameHandler.bind(this, 'Grant-eous')}
                    onClick={this.togglePersonsHandler}>
                    Click Me
                </button>
            </div>
        );
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
}

export default App;

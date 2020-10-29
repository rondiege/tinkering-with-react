import React, { Component } from 'react';

class Course extends Component {

    state = {
        courseTitle: ''
    }
    componentDidMount() {
        this.getTitleHandler();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getTitleHandler();
    }

    getTitleHandler(){
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        console.log(query);
        query.entries();
        for (let param of query.entries()) {
            if(this.state.courseTitle !== param[1])
            {
                this.setState({courseTitle: param[1]});
            }

        }
    }

    render () {
        return (
            <div>
                <h1>{this.state.courseTitle}</h1>
                <p>You selected the Course with ID: {this.props.match.params.courseId}</p>
            </div>
        );
    }
}

export default Course;
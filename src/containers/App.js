import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../component/CardList';
import SearchBox from '../component/SearchBox';
import Scroll from '../component/Scroll';
import ErrorBoundry from '../component/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions.js';

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

//STATE describes app and changes value of searchbox and input
//app owns state which can change robots - love syntax
//checkout react.component lifecycle hooks
class App extends Component {
    
    componentDidMount(){
        //implement redux-logger with this.props
        this.props.onRequestRobots()
        //fetch('https://jsonplaceholder.typicode.com/users')
           // .then(response=> response.json())
           // .then(users => this.setState({ robots: users}));
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return isPending ?
            <h1>Loading</h1> :
                (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }

//connect is a redux higher order function the 2maps are standard redux syntax
export default connect(mapStateToProps, mapDispatchToProps)(App);

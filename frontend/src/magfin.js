import React from 'react';
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from "react-router-dom";

const ADD_LIST = gql`
    mutation AddList($name: String!) {
        cardLists(name: $name) {
            _id
            name
        }
    }
`;


class Magfin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            cardlist: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        this.fetchLists();
    }

    fetchLists() {
        this.props.apollo.query({
            query: gql`
                {
                    cardLists {
                        _id
                        name
                    }
                }
            `,
            fetchPolicy: 'network-only',
        })
        .then(result => {
            console.log(this.state);
            this.setState({
                isLoaded: true,
                cardlist: result.data.cardLists
            });
        })
        .catch(error => this.setState({
            isLoaded: true,
            error: error.message
        }))
    }

    render() {
        if (this.state.isLoaded === false) {
            return (
                <div className="loading-wrapper">
                    <h1>Loading...</h1>
                </div>
            )
        }
        if (this.state.cardlist) {
            return (
                <Router>
                    <div>Magfin</div>
                    <div>
                        <h2>Navigation</h2>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/lists">Lists</Link>
                            </li>
                            <li>
                                <Link to="/lists/add">Create List</Link>
                            </li>
                            <li>
                                <Link to="/cards">Card</Link>
                            </li>
                            <li>
                                <Link to="/cards/add">Add Cards</Link>
                            </li>
                        </ul>
                    </div>

                    <Switch>
                        <Route exact path="/lists/" children={<Lists apollo={this.props.apollo} />} />
                        <Route exact path="/lists/add" children={<AddList apollo={this.props.apollo} />} />
                        <Route exact path="/cards/add" children={<AddCard apollo={this.props.apollo} />} />
                    </Switch>
                </Router>
            )
        }
    }
}

class AddList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: null,
            formValue: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({formValue: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        let input;
        const [addList, { data }] = useMutation(ADD_LIST);
        return (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addList({ variables: { type: input.value } });
                  input.value = '';
                }}
              >
                <input
                  ref={node => {
                    input = node;
                  }}
                />
                <button type="submit">Add Todo</button>
              </form>
            </div>
            //<form onSubmit={this.handleSubmit}>
            //    <label>
            //        List Name:
            //        <input type="text" value={this.state.value} onChange={this.handleChange} />
            //    </label>
            //    <input type="submit" value="submit" />
            //</form>
        );
    }
}

class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: null
        };
    }

    componentDidMount() {
    }

    render() {

        return (
            <div>
            <h2>add card here</h2>
            </div>
        );
    }
}

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: null
        };
    }

    componentDidMount() {
        this.fetchLists();
    }
    
    fetchLists() {
        this.props.apollo.query({
            query: gql`
                {
                    cardLists {
                        _id
                        name
                    }
                }
            `,
            fetchPolicy: 'network-only',
        })
        .then(result => {
            this.setState({
                isLoaded: true,
                data: result.data.cardLists
            });
        })
        .catch(error => this.setState({
            isLoaded: true,
            error: error.message
        }))
    }

    render() {
        if (this.state.isLoaded) {
            var lists = this.state.data;
            return (
                <div>
                    <table className="cardlist-table">
                    <thead>
                        <tr className="cardlist-table-header">
                            <th>Lists:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists.map((list) => {
                            return (
                                <tr key={list._id}>
                                    <td>{list.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
            )
        }
        else {
            return (
                <div className="error-load-cardlists">
                    Sorry! There was a problem fetching the card lists.
                </div>
            )
        }
    }
}

export default Magfin;

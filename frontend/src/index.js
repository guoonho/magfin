import React from 'react';
import ReactDOM from 'react-dom';
import gql from "graphql-tag";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import './style.css';
import CardListsPage from "./cardlists.js";

const GET_CARDLISTS = gql`
    query {
        cardlists {
            _id
            name
        }
    }
`;
const apollo = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    defaultOptions: {
        query: {
            fetchPolicy: 'network-only'
        }
    }
});

class MagFin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            cardlist: null,
            curList: null,
            isLoaded: false
        };

        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        console.log('Magfin mounted');
        this.fetchLists();
    }

    fetchLists() {
        apollo.query({
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
                cardlists: result.data
            });
        })
        .catch(error => this.setState({
            isLoaded: true,
            error: error.message
        }))
    }

    fetchCardsFromList(listId) {
        apollo.query({
            query: gql`
                {
                    cards {
                        _id
                        name
                    }
                }
            `,
            fetchPolicy: 'network-only',
        })
        .catch(error => this.setState({
            isLoaded: false,
            error: error.message
        }))
    }

    handleClick() {
        this.setState({
            isLoaded: false
        }, function() {
            this.fetchLists();
        });
    }

    render() {
        if (this.state.isLoaded === false) {
            return (
                <div className="loading-wrapper">
                    <h1>Loading...</h1>
                </div>
            )
        }
        if (this.state.cardlists) {
            console.log(this.state.cardlists);
            return (
                <Router>
                    <div className="magfin">
                        <div className="magfin-header">
                            <div className="magfin-header-logo">
                                magfin
                            </div>
                        </div>
                        <div className="magfin-header-logo">
                            <button onClick={(e) => this.handleClick(e)}>
                                Resync
                            </button>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                <CardListsPage apollo={apollo} cardLists={this.state.cardlists}/>
                            </Route>
                            <Route path="/list/:listId" children={<ListPage />} />
                        </Switch>
                    </div>
                </Router>
            )
        }
    }
}

function ListPage() {
    let { listId } = useParams();
    
    return (
        <div>
            <h3>ID: {listId}</h3>
        </div>
    );
}

// ============

ReactDOM.render(
    <MagFin />,
    document.getElementById('root')
)

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
import ListPage from "./listpage.js";

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
            isLoaded: false
        };
    }
    
    componentDidMount() {
    }

    render() {
            return (
                <Router>
                    <div className="magfin">
                        <div className="magfin-header">
                            <div className="magfin-header-logo">
                                magfin
                            </div>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                <CardListsPage apollo={apollo} />
                            </Route>
                            <Route path="/list/:listId" children={<ListPage />} />
                        </Switch>
                    </div>
                </Router>
            )
    }
}

// ============

ReactDOM.render(
    <MagFin />,
    document.getElementById('root')
)

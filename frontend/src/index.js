import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Magfin from "./magfin.js";
import ApolloClient from "apollo-boost";

const apollo = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    defaultOptions: {
        query: {
            fetchPolicy: 'network-only'
        }
    }
});

class App extends React.Component {
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
                                magfin yo
                            </div>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                <Magfin apollo={apollo} />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            )
    }
}

// ============

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

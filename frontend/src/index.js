import React, { useState } from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Lists from './pages/lists.js';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:8080/graphql'
});
const client = new ApolloClient({
    cache,
    link
});

const App = () => (
    <ApolloProvider client={client}>
        <Router>
            <div>
                <h2>🚀 magfin 🚀</h2>
            </div>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/list">Lists</Link></li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/">
                        <Example />
                    </Route>
                    <Route exact path="/list">
                        <Lists />
                    </Route>
                </Switch>
            </div>
        </Router>
    </ApolloProvider>
);

function Example() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p> yoyoyo {count} </p>
            <button onClick={() => setCount(count+1)}>
                click me
            </button>
        </div>
    );
}

render(<App />, document.getElementById('root'));

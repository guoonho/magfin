import React from 'react';
import ReactDOM from 'react-dom';
import gql from "graphql-tag";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import './style.css';

class CardListsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            cardlist: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        console.log("CardListsPage mounted");
        this.fetchLists();
    }

    fetchLists() {
        console.log("I was asked to fetch lists");
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
            console.log(result);
            this.setState({
                isLoaded: true,
                cardlist: result.data
            });
        })
        .catch(error => this.setState({
            isLoaded: true,
            error: error.message
        }))
    }

    render() {
        console.log("CardListPage got back the following props:");
        console.log(this.props);

        if (this.state.isLoaded === false) {
            return (
                <div className="loading-wrapper">
                    <h1>Loading...</h1>
                </div>
            )
        }
        if (this.state.cardlist) {
            return (
                <div>
                    <div className="cardlist-table-wrapper">
                        <CardListTable cardlists={this.state.cardlist} />
                    </div>
                </div>
            )
        }
    }
}

class CardListTable extends React.Component {
    render() {
        console.log(this.state);
        if (this.state.cardlist) {
            var lists = this.state.cardlist.map(function (curList) {
                return (
                    <tr>
                        <td>{curList.name}</td>
                    </tr>
                )
            })
            return (
                <div>
                    <table className="cardlist-table">
                    <thead>
                        <tr className="cardlist-table-header">
                            <th>List Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        { lists }
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

export default CardListsPage;

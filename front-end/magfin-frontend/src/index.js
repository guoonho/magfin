import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const API ="http://localhost:8080/lists";
const QUERY_LISTS = '/getAll';

class MagFin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            cardlist: null,
            isLoaded: false
        };
    }
    
    componentDidMount() {
        fetch(API + QUERY_LISTS, {
            method: "GET",
            headers: {
                "Accept": 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                isLoaded: true,
                cardlists: data.cardlists
            }))
            .catch(error => this.setState({
                isLoaded: true,
                error: error.message
            }))
    }

    render() {
        return (
            <div className="cardlist-table">
                <h1>MagFin</h1>
                <div className ="cardlist-update-wrapper">
                    <UpdateCardLists />
                </div>
                <div className="cardlist-table-wrapper">
                    <CardListTable cardlists={this.state.cardlists} isLoaded={this.state.isLoaded} />
                </div>
            </div>
        )
    }
}

class UpdateCardLists extends React.Component {
    render() {
        return (
            <button className = "cardlist-update-button">
            <h2>Fetch New Prices</h2>
            </button>
        )
    }
}

class CardListTable extends React.Component {
    render() {
        if (this.props.isLoaded === false) {
            return (
                <div className="loading-wrapper">
                    Loading...
                </div>
            )
        }
        if (this.props.cardlists) {
            var lists = this.props.cardlists.map(function (curList) {
                return (
                    <tr>
                        <th>{curList.name}</th>
                        <th>{curList.createDate}</th>
                    </tr>
                )
            })
            return (
                <div>
                    <table>
                        { lists }
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
}}

// ============

ReactDOM.render(
    <MagFin />,
    document.getElementById('root')
);

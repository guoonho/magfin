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
            curList: null,
            isLoaded: false
        };

        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        this.fetchLists();
    }

    fetchLists() {
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

    handleClick() {
        this.setState(state => ({
            isLoaded: false
        }));
        this.fetchLists();
    }

    render() {
        return (
            <div className="magfin">
                <div className="magfin-header">
                    <div className="magfin-header-logo">
                        magfin
                    </div>
                </div>
                <div className ="cardlist-update-wrapper">
                    <button className="cardlist-update-button" onClick={this.handleClick}>
                        <h2>Refresh Lists</h2>
                    </button>
                </div>
                <div className="cardlist-table-wrapper">
                    <CardListTable cardlists={this.state.cardlists} isLoaded={this.state.isLoaded} />
                </div>
                <div className="current-cardlist-wrapper">
                    <CardList cardlists={this.state.cardlists} curList={this.state.curList} />
                </div>
            </div>
        )
    }
}

class CardListTable extends React.Component {
    render() {
        if (this.props.isLoaded === false) {
            return (
                <div className="loading-wrapper">
                    <h1>Loading...</h1>
                </div>
            )
        }
        if (this.props.cardlists) {
            var lists = this.props.cardlists.map(function (curList) {
                return (
                    <tr>
                        <td>{curList.name}</td>
                        <td>N/A</td>
                        <td>{curList.createDate}</td>
                    </tr>
                )
            })
            return (
                <div>
                    <table className="cardlist-table">
                    <tr className="cardlist-table-header">
                        <th>List Name</th>
                        <th>Current Market Value</th>
                        <th>Add Date</th>
                    </tr>
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

class CardList extends React.Component {


    render() {
        return (
            <div>
                {this.props.curList}
            </div>
        )    
    }
}

// ============

ReactDOM.render(
    <MagFin />,
    document.getElementById('root')
);

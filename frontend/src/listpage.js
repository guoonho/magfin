import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

class ListPage extends React.Component {
    ComponentDidMount() {
        console.log("ListPage mounted");
    }

    render() {
        console.log("I got back the following:");
        console.log(this.props);
        return (
            <div>
                <div className="cardlist-table-wrapper">
                    I'm at the individual list page.
                </div>
            </div>
        )
    }
}

class ListPageTable extends React.Component {
    render() {
        if (this.props.cardlists) {
            var lists = this.props.cardlists.cardLists.map(function (curList) {
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
}}

export default ListPage;

import React, { Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link} from 'react-router-dom';
import gql from 'graphql-tag';

const CARDS_FROM_LIST = gql`
    query CardsFromList($listId: String!) {
        cards(listId: $listId) {
            name
            edition
            listId
        }
    }
`;

export default function CardList(listId) {
    
    const { data, loading, error } = useQuery(
        CARDS_FROM_LIST,
        { 
            fetchPolicy: "network-only",
            variables: { listId }
        }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR LOADING CARDS FOR LIST {listId}</p>;

    return (
        <Fragment>
            <p>Hello {listId}</p>
            {data.cards &&
                data.cards.map(({ name, edition }) => (
                    <div key={name}>
                        <p>
                            Name: {name}, Edition: {edition}
                        </p>
                    </div>
                ))
            }
        </Fragment>
    );
}


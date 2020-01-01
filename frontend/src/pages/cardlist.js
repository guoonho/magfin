import React, { Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link} from 'react-router-dom';
import gql from 'graphql-tag';

const CARDS_FROM_LIST = gql`
    query CardsFromList($listId: String!) {
        cards(listId: $listId) {
            _id
            name
            edition
            listId
        }
    }
`;

const ADD_CARD_TO_LIST = gql`
    mutation AddCard($name: String!, $edition: String!, $listId: String!) {
        cards(name: $name, edition: $edition, listId: $listId)
        {
            _id
            name
            edition
            listId
        }
    }
`;

const REMOVE_CARD_FROM_LIST = gql`
    mutation DeleteCard($cardId: String!) {
        deleteCard(cardId: $cardId)
    }
`;

export default function CardList(listId) {
    let nameInput;
    let editionInput;
    
    const { data, loading, error, refetch } = useQuery(
        CARDS_FROM_LIST,
        { 
            fetchPolicy: "network-only",
            variables: { listId }
        }
    );
    const [removeCard, { removeCardData }] = useMutation(REMOVE_CARD_FROM_LIST);
    const [addCard, { addCardData }] = useMutation(ADD_CARD_TO_LIST);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR LOADING CARDS FOR LIST {listId}</p>;

    return (
        <Fragment>
            <p>Hello {listId}</p>
            {data.cards &&
                data.cards.map(({ _id, name, edition }) => (
                    <div key={_id}>
                        <p>
                            Name: {name}, Edition: {edition}, id: {_id}
                        </p>
                        <button
                            onClick={e => {
                                removeCard({ variables: { cardId: _id } });
                                refetch();
                            }}
                        >
                            X
                        </button>
                    </div>
                ))
            }
            {data.cards && (
                <div>
                    <h2>Add Card </h2>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            addCard({ variables : {
                                name: nameInput.value,
                                edition: editionInput.value,
                                listId: listId
                            }});
                            nameInput.value = '';
                            editionInput.value = '';
                            refetch();
                        }}
                    >
                        Name: 
                        <input
                            ref={node => {
                                    nameInput = node;
                            }}
                        />
                        <br />
                        Edition: 
                        <input
                            ref={node => {
                                    editionInput = node;
                            }}
                        />
                        <br />
                        <button type="submit">Add Card</button>
                    </form>
                </div>
            )}
        </Fragment>
    );
}


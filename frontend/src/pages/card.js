import React, { Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

const REMOVE_CARD_FROM_LIST = gql`
    mutation DeleteCard($cardId: String!) {
        deleteCard(cardId: $cardId)
    }
`;

export default function RemoveCardButton(cardId) {
    console.log(cardId);
    const [removeCard, { data }] = useMutation(REMOVE_CARD_FROM_LIST);

    return (
        <Fragment>
            <button
                onClick={e => {
                    removeCard({ variables: { cardId: cardId.cardId } });
                }}
            >
                x
            </button>
        </Fragment>
    );
}

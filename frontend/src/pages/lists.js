import React, { Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_LISTS = gql`
    query Lists {
        cardLists {
            _id
            name
        }
    }
`;

const ADD_CARD_LIST = gql`
    mutation AddCardList($name: String!) {
        cardLists(name: $name) {
            _id
            name
        }
    }
`;

export default function Lists() {
    let input;
    const { data, loading, error, refetch } = useQuery(
        GET_LISTS,
        { fetchPolicy: "network-only" }
    );
    const [addCardList, { addData }] = useMutation(ADD_CARD_LIST);

    if (loading) return <p>Loading lists...</p>;
    if (error) return <p>ERROR LOADING LISTS</p>;

    return (
        <Fragment>
            {data.cardLists &&
                data.cardLists.map(({ _id, name }) => (
                    <div key={_id}>
                        <p>
                            {name}: {_id}
                        </p>
                    </div>
                ))
            }
            {data.cardLists && (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            addCardList({ variables: { name: input.value } });
                            input.value = '';
                            refetch();
                        }}
                    >
                        <input
                            ref={node => {
                                input = node;
                            }}
                        />
                        <button type="submit">Add List</button>
                    </form>
                </div>
            )}
        </Fragment>
    );
}

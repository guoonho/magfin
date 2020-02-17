import React, { Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
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

const REMOVE_CARD_LIST = gql`
    mutation DeleteList($listId: String!) {
        deleteList(listId: $listId)
    }
`;

function listIdLink(listId) {
    return `/list/${listId}`;
}

export default function Lists() {
    let input;
    const { data, loading, error, refetch } = useQuery(
        GET_LISTS,
        { fetchPolicy: "network-only" }
    );
    const [addCardList, { addData }] = useMutation(ADD_CARD_LIST);
    const [removeCardList, { removeData }] = useMutation(REMOVE_CARD_LIST);

    if (loading) return <p>Loading lists...</p>;
    if (error) return <p>ERROR LOADING LISTS</p>;

    return (
        <Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.cardLists &&
                        data.cardLists.map(({ _id, name }) => (
                            <tr key={_id}>
                                <td>
                                    <Link to={listIdLink(_id)}>{name}</Link>
								</td>
								<td>
									<button
										onClick={e => {
											removeCardList({ variables: { listId: _id} });
											refetch();
										}}
									>
										X
									</button>
								</td>
                            </tr>
                        ))
                    }
				</tbody>
			</table>
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

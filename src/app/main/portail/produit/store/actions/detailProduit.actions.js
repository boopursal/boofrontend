import agent from "agent";

export const CLEAN_UP = '[DETAIL PRODUIT APP] CLEAN_UP';
export const REQUEST_PRODUIT = '[DETAIL PRODUIT APP] REQUEST_PRODUIT';
export const REQUEST_PRODUITS_SIMILAIRES = '[DETAIL PRODUIT APP] REQUEST_PRODUITS_SIMILAIRES';
export const GET_PRODUIT = '[DETAIL PRODUIT APP] GET_PRODUIT';
export const GET_PRODUITS_SIMILAIRES = '[DETAIL PRODUIT APP] GET_PRODUITS_SIMILAIRES';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getProduit(slug) {
    const request = agent.get(`/api/produits?isValid=true&slug=${slug}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_PRODUIT,
        });
        dispatch({
            type: REQUEST_PRODUITS_SIMILAIRES,
        });
        return request.then((response) => {

            dispatch({
                type: GET_PRODUIT,
                payload: response.data['hydra:member'][0]
            })
            if (response.data['hydra:member'][0]) {
                const request2 = agent.get(`/api/produits?isValid=true&categorie=${response.data['hydra:member'][0].categorie['@id']}`);
                return request2.then((response) =>
                    dispatch({
                        type: GET_PRODUITS_SIMILAIRES,
                        payload: response.data['hydra:member']
                    })
                );
            }

        }



        );
    }

}


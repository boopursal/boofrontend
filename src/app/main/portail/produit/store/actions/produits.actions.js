import agent from "agent";
import axios from "axios";

export const CLEAN_UP = '[PRODUITS APP] CLEAN_UP';
export const REQUEST_PRODUITS = '[PRODUITS APP] REQUEST_PRODUITS';
export const REQUEST_SECTEURS_COUNT = '[PRODUITS APP] REQUEST_SECTEURS_COUNT';
export const REQUEST_PAYS_COUNT = '[PRODUITS APP] REQUEST_PAYS_COUNT';

export const GET_PRODUITS = '[PRODUITS APP] GET_PRODUITS';
export const GET_SECTEURS_COUNT = '[PRODUITS APP] GET_SECTEURS_COUNT';
export const GET_PAYS_COUNT = '[PRODUITS APP] GET_PAYS_COUNT';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getProduits(params) {
    const request = agent.get(`/api/produits`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_PRODUITS,
        });

        return request.then((response) => {

            dispatch({
                type: GET_PRODUITS,
                payload: response.data
            })

        }



        );
    }

}





export function getSecteursAndPaysCounts() {

    const request = agent.get(`/count_produit_secteurs`);
    const request2 = agent.get(`/count_produit_pays`);
    return (dispatch) => {
        axios.all([request, request2]).then(axios.spread((...responses) => {
            
            request.then((response) =>
                dispatch({
                    type: GET_SECTEURS_COUNT,
                    payload: responses[0].data
                })
            );
            request2.then((response2) =>
                dispatch({
                    type: GET_PAYS_COUNT,
                    payload: responses[1].data
                })
            );
           
            // use/access the results 
        })).catch(errors => {
            // react on errors.
        })
    }

}


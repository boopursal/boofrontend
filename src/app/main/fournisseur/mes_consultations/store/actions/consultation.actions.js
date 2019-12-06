
import agent from 'agent';


export const REQUEST_CONSULTATION = '[CONSULTATION APP] REQUEST CONSULTATION';
export const GET_CONSULTATION = '[CONSULTATION APP] GET CONSULTATION';

export const SAVE_ERROR = '[CONSULTATION APP] SAVE ERROR';

export const CLEAN_UP = '[CONSULTATION APP] CLEAN_UP';



export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getConsultation(params) {
    const request = agent.get(`/api/detail_visites/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_CONSULTATION,
        });
        return request.then((response) => {
            dispatch({
                type: GET_CONSULTATION,
                payload: response.data
            })
        }

        );
    }

}







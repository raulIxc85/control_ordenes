import { handleActions } from 'redux-actions';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LISTADO_VENTAS = 'LISTADO_VENTAS';
const DATOS_REPORTE = 'DATOS_REPORTES';

export const mostrar = () => (dispatch) => {
    api.get('/orden/total_ventas').then((response)=>{
        dispatch({ type: LISTADO_VENTAS, lecturaVentas: response });
        api.get('/orden/total_ventas_global').then((response)=>{
            dispatch({ type: DATOS_REPORTE, lecturaDatos: response });
        }).catch((error)=>{
            console.log("error: ", error)
            NotificationManager.error(
                'Ocurrió un error al mostrar total',
                'Error',
                0
            );
        })
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los productos',
            'Error',
            0
        );
    })
}

export const actions = {
    mostrar
};

export const reducers = {
    [LISTADO_VENTAS]: (state, { lecturaVentas } ) => {
        return {
            ...state,
            lecturaVentas
        };
    },
    [DATOS_REPORTE]: (state, { lecturaDatos } ) => {
        return {
            ...state,
            lecturaDatos
        };
    },   
};

export const initialState = {
    lecturaVentas: {},
    lecturaDatos: '',
};

export default handleActions(reducers, initialState)

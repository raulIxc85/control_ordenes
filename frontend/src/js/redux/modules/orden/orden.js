import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";

const DETALLE_PRODUCTO = 'DETALLE_PRODUCTO';

//  -----------------------------
//  Constantes
//  -----------------------------

const baseReducer = createReducer(
    'orden',         //nombre estado
    'ordden',         //url API
    'ordenForm',     //formulario
    '/catalogo-productos'        //redireccion de vista
);

const verDetalleProducto = id => (dispatch) => {
    api.get(`producto/${id}`).then((response) => {
        dispatch({ type: DETALLE_PRODUCTO, lecturaProducto: response });
        dispatch(initializeForm("ventaProductoForm", response));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar producto',
            'Error',
            0
        );
    })
};

const guardarOrden = () => (dispatch, getStore) => {
    const formData = getStore().form.ventaProductoForm.values;
    let total = (parseFloat(formData.cantidad)*parseFloat(formData.precio));
    console.log("id",formData) 
    const data = {
        cantidad: formData.cantidad,
        total: total,
        id: formData.id,
        precio: formData.precio
    }
    api.post('/orden', data).then((response) => {
        NotificationManager.success(
            'Se ha guardado la orden correctamente',
            'Exito',
            3000
        );
        console.log("response",response);
        dispatch(push('/catalogo-producto'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al guardar la orden / No puede comprar productos que usted mismo creó',
            'Error',
            0
        );
    })
}


export const initialState = {
    ...baseReducer.initialState,
    lecturaProducto: {},
}

export const actions = {
    ...baseReducer.actions,
    verDetalleProducto,
    guardarOrden
}


export const reducers = {
    ...baseReducer.reducers,
    [DETALLE_PRODUCTO]: (state, { lecturaProducto }) => {
        return {
            ...state,
            lecturaProducto,
        }
    },
}

export default handleActions(reducers, initialState)

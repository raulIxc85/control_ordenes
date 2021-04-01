import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/orden/orden';
import VentaProducto from './VentaProducto';

const ms2p = (state) => {
    return {
        ...state.orden,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(VentaProducto);

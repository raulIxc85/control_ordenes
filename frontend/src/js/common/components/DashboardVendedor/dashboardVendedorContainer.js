import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/reportes/reportes';
import DashboardVendedor from './dashboardVendedor';

const ms2p = (state) => {
    return {
        ...state.reportes,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(DashboardVendedor);


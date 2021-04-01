import React, { Component } from 'react';
import Grid from "../Utils/Grid";

class DashboardVendedor extends Component {
    componentWillMount = () => {
        const { mostrar } = this.props;
        mostrar();
    }
    render() {
        const { lecturaVentas, lecturaDatos } = this.props;

        return (
            
            <div className="page-header py-4 no-gutters row">
                <div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12 col-sm-12">
                    <span
                        className="text-uppercase page-subtitle">Dashboard Ventas
                    </span>
                    <br />
                    <br />
                    
                    <div className="col-sm-8">
                        <div className="mb-4 card card-small">
                            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                <div className="d-flex flex-column flex-1 mx-3">
                                    <label>Total Ventas por producto</label>
                                    <div className="p-0 px-3 pt-3">
                                    <Grid 
                                        data={lecturaVentas} 
                                        headerStyle={ { background: '#d2dbdc' } }
                                    >
                                        <TableHeaderColumn
                                            isKey
                                            dataField="producto__descripcionCorta"
                                            dataSort
                                        >
                                            Producto
                                        </TableHeaderColumn>
                                        <TableHeaderColumn
                                            headerAlign="center"
                                            dataField="total"
                                            dataAlign="right"
                                            dataSort
                                            dataFormat={(cell, row)=>{
                                                return (new Intl.NumberFormat("es-GT", {style: "currency", currency: "GTQ"}).format(cell));
                                            }}
                                        >
                                            Total
                                        </TableHeaderColumn>
                                        
                                    </Grid>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-sm-8">
                        <div className="mb-4 card card-small">
                            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                <div className="d-flex flex-column flex-1 mx-3">
                                    <label>Tolal en Ventas</label>
                                        <div className="text-center">
                                            <h1>{new Intl.NumberFormat("es-GT", {style: "currency", currency: "GTQ"}).format(lecturaDatos.total_venta.total)}</h1>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="mb-4 card card-small">
                            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                <div className="d-flex flex-column flex-1 mx-3">
                                    <label>Promedio de precio</label>
                                        <div className="text-center">
                                            <h1>{new Intl.NumberFormat("es-GT", {style: "currency", currency: "GTQ"}).format(lecturaDatos.promedio_precio.total)}</h1>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div> 
        );
    }
}

export default DashboardVendedor;

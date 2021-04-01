import React, { Component } from 'react';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class CatalogoProductosList extends Component{
    componentWillMount = () => {
        const { listarProductos } = this.props;
        listarProductos();
        
    }
    render(){
        const { data, loader, listar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Productos</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/productos/crear'
                        className='btn btn-primary mr-2 mb-3'
                    >
                        Ver carrito
                    </a>
                    
                </div>
                {data &&
                    <Grid 
                        hover 
                        striped 
                        data={data} 
                        loading={loader} 
                        onPageChange={listar} 
                        //onSortChange={onSortChange} 
                    >
                        <TableHeaderColumn
                            dataField="descripcionCorta"
                            dataSort
                        >
                            Descripcion
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            headerAlign="center"
                            dataAlign="right"
                            dataField="precio"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return (new Intl.NumberFormat("es-GT", {style: "currency", currency: "GTQ"}).format(cell));
                            }}
                        >
                            Precio
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            headerAlign="center"
                            dataAlign="center"
                            dataField="imagen"
                            dataFormat={(cell, row)=>{
                                return (<div><img src={cell} width="50" height="50"/></div>);
                            }}
                            dataSort
                        >
                            Imagen
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            isKey
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={(cell, row)=>{
                                let ruta = window.location.href;
                                return (<a className='btn btn-outline-primary btn-sm' href={ruta+'/'+cell}>Ver detalle</a>);
                                
                            }}
                        >
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={(cell, row)=>{
                                let ruta = window.location.href;
                                return (<a className='btn btn-outline-dark btn-sm' href={ruta+'/venta/'+cell}>Compra Directa</a>);
                                
                            }}
                        >
                        </TableHeaderColumn>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default CatalogoProductosList;
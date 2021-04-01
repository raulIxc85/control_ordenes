import React, { Component } from 'react';
import Formulario from './VentaProductoFormulario';

class VentaProducto extends Component{
    
    componentWillMount = () => {
        const { verDetalleProducto } = this.props;
        let ruta = window.location.href;
        let datos = ruta.split('/');
        verDetalleProducto(datos[6]);
    }

    render(){
        const { lecturaProducto, guardarOrden } = this.props;
        return(
            <Formulario
                onSubmit = {guardarOrden}
                lecturaProducto = {lecturaProducto}
            />
        );
    }
}

export default VentaProducto;
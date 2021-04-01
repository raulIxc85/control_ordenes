import React, { Component } from 'react';
import Formulario from './VerProductoFormulario';

class VerProducto extends Component{
    
    componentWillMount = () => {
        const { verDetalle } = this.props;
        let ruta = window.location.href;
        let datos = ruta.split('/');
        verDetalle(datos[5]);
        
    }

    render(){
        const { lecturaProducto, guardarCarrito, match } = this.props;
        return(
            <Formulario
                onSubmit = {guardarCarrito}
                lecturaProducto = {lecturaProducto}
                match = {match}
            />
        );
    }
}

export default VerProducto;
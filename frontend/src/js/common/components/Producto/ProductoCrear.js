import React, { Component } from 'react';
import Formulario from './ProductoFormulario';

class ProductoCrear extends Component{
    state = {
        crear: true,
        imagen: null,
    }

    componentWillMount = () => {
        const { leer, match } = this.props;
        const id = match.params.id;
        if (id){
            this.setState({crear: false});
            leer(id);
        }
    }

    setImagen = (imagen) => {
        this.setState({ imagen });
    }

    registro = (data) => {
        const { registroProducto, imagen } = this.props;
        registroProducto({ ...data, imagen: null},
        [{ file: this.state.imagen, name: 'imagen' },])
    }

    editar = (data) => {
        const { editarProducto, imagen } = this.props;
        editarProducto( {...data, imagen: null},
        [{ file: this.state.imagen, name: 'imagen' },])
    }

    render(){
        const { imagen, borrarImagen } = this.props;
        const { crear } = this.state;
        const tipoFuncion = crear ? this.registro : this.editar;
        return(
            <Formulario
                onSubmit = {tipoFuncion}
                imagen = {imagen}
                setImagen = {this.setImagen}
                borrarImagen = { borrarImagen }
                crear = { crear }
            />
        );
    }
}

export default ProductoCrear;
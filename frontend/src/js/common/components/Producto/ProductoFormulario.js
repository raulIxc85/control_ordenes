import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderTextArea,
    renderCurrency,
    renderFilePicker
} from "../Utils/renderField/renderField";

class ProductoFormulario extends Component{
    componentWillUnmount = () => {
        const { borrarImagen } = this.props;
        borrarImagen();
    }
    render(){
        const { handleSubmit, setImagen, imagen, crear } = this.props
        let verImagen = '';
        let ocultar = '';
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Modificar Producto' : 'Crear Producto';
        let disabled = false;
        if (crear == false && editar == false){
            ocultar = 'd-none';
            disabled = true;
            titulo = 'Ver Producto';
        }else{
            if (crear==true){
                verImagen='d-none'
            }
            
        }
        return ( 
            <form onSubmit={handleSubmit} className='w-75'>
                <h3>{titulo}</h3>
                <div className="mb-4 card card-small">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <label htmlFor="descripcionCorta">Descripción corta</label>
                            <Field 
                                name="descripcionCorta"
                                component={renderField}
                                disabled={disabled}

                            />
                            <label htmlFor="descripcion">Descripción</label>
                            <Field
                                name="descripcion"
                                component={renderTextArea}
                                disabled={disabled}
                            />
                            <div className='w-25'>
                                <label htmlFor="precio">Precio</label>
                                <Field
                                    name="precio"
                                    component={renderCurrency}
                                    disabled={disabled}
                                />
                            </div>
                            <div className={`form-group has-feedback flex-1 mx-2 ${ocultar}`}>
                                <label htmlFor="imagen">Subir Imagen</label>
                                <Field
                                    name="imagen"
                                    setFile={setImagen}
                                    photo={imagen}
                                    component={renderFilePicker}
                                />
                                
                            </div>
                            <div className={`${verImagen}`}>
                                    <br/>
                                    <div className="text-center">
                                        <img src={imagen} alt="S/I" width="150" height="150"/>
                                    </div>
                                </div>
                            <div className='d-flex flex-row justify-content-end mt-3'>
                                <a
                                    href="/#/productos"
                                    className='btn btn-secondary btn-sm mr-2 mb-3'
                                >
                                    Cancelar
                                </a>
                                {disabled == false && 
                                    <button
                                        className={`btn btn-sm mb-3 ${editar ? 'btn-success' : 'btn-primary'}`}
                                        type='submit'
                                    >   
                                        { editar ? 'Modificar' : 'Registrar' }
                                    </button>  
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'productoForm', //identificador unico
   
})(ProductoFormulario)

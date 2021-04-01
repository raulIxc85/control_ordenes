import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderNumber,
    renderCurrency,
    renderField
} from "../Utils/renderField/renderField";
import { validate, validators } from 'validate-redux-form';


class VentaProductoFormulario extends Component{
    constructor(props) {
        super(props);
        this.state = {
            totalVenta: 0.00
        };
    }
    render(){
        const { handleSubmit, lecturaProducto } = this.props
        let total=0.00;
        return ( 
            <form onSubmit={handleSubmit} className='w-75'>
                <h3>Ver Producto</h3>
                <div className="mb-4 card card-small">
                    <div className="border-bottom card-header"><h6 className="m-0">{lecturaProducto.descripcionCorta}</h6></div>
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <p>{lecturaProducto.descripcion}</p>
                            <div className='w-75'>
                                <h4 htmlFor="precio">Precio: Q. {lecturaProducto.precio}</h4>
                            </div>
                            <div className='text-center'>
                                <a href={lecturaProducto.imagen} target='_blank'>
                                    <img src={lecturaProducto.imagen} width="150" and height="150" />
                                </a>
                            </div>
                            <div className='w-25'>
                                <label htmlFor="cantidad">Cantidad</label>
                                <Field
                                    name="cantidad"
                                    component={renderNumber}
                                    onChange={(e, value)=>{
                                        let cantidad = value;
                                        let precio = lecturaProducto.precio;
                                        total = cantidad*precio;
                                        this.state.totalVenta = total;
                                    }}
                                />
                                
                            </div>
                                <Field
                                    name="precio"
                                    component={renderField}
                                    type="hidden" 
                                />
                               
                            <div className='w-25'>
                                <label htmlFor="total">Total</label>
                                <Field
                                    name="total"
                                    input={ {value: this.state.totalVenta } }
                                    component={renderCurrency}
                                    disabled={true}
                                />
                            </div>
                            <div className='d-flex flex-row justify-content-end mt-3'>
                                <a
                                    href="/#/catalogo-productos"
                                    className='btn btn-secondary btn-sm mr-2 mb-3'
                                >
                                    Cancelar
                                </a>
                                <button
                                    className='btn btn-sm mb-3 mr-2 btn-primary'
                                    type='submit'
                                >   
                                    Compra Directa
                                </button>  
                               
                            </div>
                            
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'ventaProductoForm', //identificador unico
    validate: (data) => {
        return validate(data, {
            cantidad: validators.exists()('Este campo es requerido'),
        });
    },
   
})(VentaProductoFormulario)

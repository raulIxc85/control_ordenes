import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class CompraDirecta extends Component{
    render(){
        const { handleSubmit } = this.props
        return ( 
            <form onSubmit={handleSubmit} >
                <button
                    className='btn btn-sm mb-3 btn-primary'
                    type='submit'
                >   
                    Agregar al carrito
                </button>  
            </form>
        )
    }
}

export default reduxForm({
    form: 'compraForm', //identificador unico
   
})(CompraDirecta)

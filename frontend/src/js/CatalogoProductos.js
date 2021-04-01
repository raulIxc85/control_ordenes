import React, { Component } from "react";
import { Route } from "react-router-dom";

// maquetado base
import SiderBarRegistro from './common/components/layout/Sidebar/SideBarRegistro';
import FooterRegistro from './common/components/layout/Footer/FooterRegistro';

import NavbarRegistro from "./common/components/layout/Navbar/NavbarRegistro";

class CatalogoProductos extends Component {
    constructor(props) {
        super(props);

    }
      
    render() {
        const { component: Component } = this.props;
        return (
            <Route
                render={props =>
                <div>
                    <SiderBarRegistro />
                        <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                                <div className="main-navbar bg-white sticky-top">
                                    <div className="p-0 container">
                                        <NavbarRegistro  />
                                    </div>
                                </div>
                                <div className="main-content-container px-4 container-fluid">
                                    <Component {...props} />
                                </div>
                                <FooterRegistro />
                        </main>
                </div>
                }
            />     
        );
    }
}

export default CatalogoProductos;


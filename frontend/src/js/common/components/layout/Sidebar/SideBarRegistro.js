import React, { Component } from 'react';
import { NavLink }  from "react-router-dom";

class SideBarRegistro extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut } = this.props;
        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen?'':'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a  href="#" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto">
                                <img id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require('assets/img/logo.png')}
                                    alt="Logo" />
                            </div>
                        </a>
                        <a  className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink to="/catalogo-productos" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">store</i>
                                </div>
                                <span>Tienda</span>
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBarRegistro;

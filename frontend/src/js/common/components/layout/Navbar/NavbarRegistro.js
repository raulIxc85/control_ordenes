import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link} from "react-router-dom";


class NavbarRegistro extends Component {
    constructor(props) {
        super(props);
        this.state = {dropdownOpen: false};
    }

    toggle = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    };
    render() {
        const { navToggle, logOut, user } = this.props;

        return (
            <nav className="align-items-stretch flex-md-nowrap p-0 navbar navbar-light">
                <div className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                    <div className="ml-3 input-group input-group-seamless" />
                </div>
                <Link to='/registro' className='btn btn-primary mb-3 mt-3 mr-3'>Registro</Link>
                <Link to='/login' className='btn btn-primary mb-3 mt-3 mr-3'>Login</Link>
                
                <nav className="nav">
                    <a  className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
                        onClick={ navToggle } >
                        <i className="material-icons"></i>
                    </a>
                </nav>
            </nav>
        );
    }
}

export default NavbarRegistro;

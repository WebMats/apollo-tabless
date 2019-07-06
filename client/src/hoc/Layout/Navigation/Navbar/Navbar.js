import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from './DrawerToggler';
import Logo from '../../../../components/Logo/Logo';

import './Navbar.scss';


const navbar = (props) => (
            <header className="Navbar">
                <div className="LogoHolder">{!props.logoShow && <Logo />}</div>
                <nav className="DesktopOnly">
                    <NavigationItems />
                </nav>
                <DrawerToggler />
            </header>    
)

export default navbar;
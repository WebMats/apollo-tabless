import React from 'react';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import LayoutContext from '../../layout-context';
import Logo from '../../../../components/Logo/Logo';

import './SideDrawer.scss';


const sideDrawer = (props) => (
            <LayoutContext.Consumer>
                {(context) => {
                    let sideDrawerClass = context.opened ? "SideDrawer Open" : "SideDrawer Close";
                    return (
                        <React.Fragment>
                            <Backdrop show={context.opened} clicked={context.toggle}/>
                            <div className={sideDrawerClass}>
                                <div className="LogoHolder"><Logo /></div>
                                <nav onClick={context.toggle}>
                                    <NavigationItems />
                                </nav>
                            </div>
                        </React.Fragment>
                    )
                }}
            </LayoutContext.Consumer>
            
)

export default sideDrawer;
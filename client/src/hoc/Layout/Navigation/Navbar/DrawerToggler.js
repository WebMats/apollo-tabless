import React from 'react';
import LayoutContext from '../../layout-context';

import './DrawerToggler.scss';


const drawerToggler = () => {
    return (
        <LayoutContext.Consumer>
            {(context) => {
                const holderClass = context.opened ? "TogglerDiamond Active" : "TogglerDiamond"
                return (
                    <div className={holderClass} onClick={context.toggle}>
		                <div className="Toggler"></div>
	                </div>
                )
            }}
        </LayoutContext.Consumer>
    )
}

export default drawerToggler;
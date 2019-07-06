import React, { Component } from 'react'
import Navbar from './Navigation/Navbar/Navbar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';
import Footer from './Footer/Footer';
import LayoutContext from './layout-context';


export default class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    toggleHandler = () => {
        this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}))
    }
    render(){
        const mainStyle = { 
            transform:`translateX(${ this.state.showSideDrawer ? '-300px': '0px'})`, 
            transition:"transform 0.3s ease-out" 
        }
        return (
            <>
                <LayoutContext.Provider value={{opened:this.state.showSideDrawer, toggle: this.toggleHandler, authed: this.props.showProtectedLinks}}>
                    <Navbar logoShow={this.state.showSideDrawer}/>
                    <SideDrawer/>
                </LayoutContext.Provider>
                <main style={mainStyle}>
                    {this.props.children}
                </main>
                <Footer />
            </>
        )
    }
}

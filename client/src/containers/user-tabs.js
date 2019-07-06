import React, { Component } from 'react';
import UpdateTabForm from './update-tab-form';
import Modal from '../components/UI/Modal/Modal';
import MyTab from '../components/MyTab/MyTab';

import './user-tabs.scss';


class MyTabs extends Component {
    state = {
        idOfTagToUpdate: null
    }
    tagEditHandler = (e, tabId) => {
        e.stopPropagation();
        this.setState({idOfTagToUpdate: tabId})
    }
    cancelUpdateHandler = () => {
        this.setState({idOfTagToUpdate: null})
    }

    render() {
        let copiedTabs = [...this.props.tabs];
        const tabElements = copiedTabs.reduce((accum, tab) => {
            const valuesInCurrentColumn = accum[accum.length - 1];
            if (valuesInCurrentColumn !== undefined && valuesInCurrentColumn.length < 5) {
                const updatedCurrentColumn = [...accum[accum.length - 1], tab]
                accum.pop();
                return [...accum, updatedCurrentColumn]
            }
            return [...accum, [tab]]
        }, [])
            const userTabs = tabElements.map((column, i) => {
                return (
                <div key={i} className="TabsColumn">
                    {column.map(tab => {
                        return (<MyTab tagEdit={(e) => this.tagEditHandler(e, tab.tabId)} deleteTab={() => this.props.deleteTab({variables: {tabId: tab.tabId}})} key={tab.tabId} tab={tab} />)
                        })}
                </div>
            )})
        let modal = null;
        if (this.state.idOfTagToUpdate) {
            modal = (<Modal title="Update Your Tab" cancelUpdate={this.cancelUpdateHandler}>
                        <UpdateTabForm cancelUpdate={this.cancelUpdateHandler} tab={this.props.tabs.find(tab => tab.tabId === this.state.idOfTagToUpdate)}/>
                    </Modal>)
        }
        return (
            <div className="MyTabsContainer">
                {modal}
                {userTabs.length > 0 ? userTabs : <p style={{marginLeft: "5rem", fontSize:"1.4rem"}}>Start adding some tabs!</p>}
            </div>
        )
    }
}



export default MyTabs;
import React from 'react'
import MyTabMain from './MyTabMain/MyTabMain';
import MyTabBody from './MyTabBody/MyTabBody';

import './MyTab.scss';

const myTabs = (props) => {
  let dummyLink = document.createElement('a')
  if (!props.tab.tabUrl.includes('http')) {
    props.tab.tabUrl = `https://${props.tab.tabUrl}`
  }
  dummyLink.href = props.tab.tabUrl
  const tabIconLink = `https://${dummyLink.hostname}/favicon.ico`
  const tabRef = React.createRef();
  const handlerExpansion = () => {
    tabRef.current.className = tabRef.current.className === "MyTabContainer Expanded" ? "MyTabContainer" : "MyTabContainer Expanded";
  }
  
  return (
    <div className="MyTabContainer" onClick={handlerExpansion} ref={tabRef} >
        <MyTabMain src={tabIconLink} placeLink={dummyLink.pathname === '/' ? dummyLink.hostname : `${dummyLink.pathname+dummyLink.search}`} href={props.tab.tabUrl} />
        <MyTabBody importance={props.tab.importance} category={props.tab.category} tagEdit={props.tagEdit}/>
        <span className="MyTabContainer-Delete__button" onClick={props.deleteTab}></span>
    </div>
  )
}

export default myTabs

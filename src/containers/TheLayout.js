import React from 'react'
import {useSelector} from 'react-redux'
import { Redirect } from 'react-router';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'


const TheLayout = () => {

    const auth = useSelector((state) => state.auth);
    if (!auth.authenticate) return <Redirect to={"/login"} />;
   

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout

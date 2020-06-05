import React, {useEffect} from 'react'
import {Ripple} from 'react-preloaders'; 
import $ from 'jquery';

export default function Preloader() {

  useEffect(() => {

    return () => {
      $('body').removeAttr('style');
    }
  })

  return (
    <div className="preloader">
      <Ripple />
    </div>
  )
}

import React from 'react'

export default function EditPopup() {
  return (
    <div className="cmp-container--subscription-popup">
      <div className="cmp-container--subscription-popup--content">
        <div className="cmp-container--subscription-popup--heading">
          <p className="cmp-text--subscription-popup--heading--title">Edit pause</p>
          <span className="cmp-btn--subscription-popup-close"></span>
        </div>
        <div className="cmp-container--subscription-popup--body">
          <p className="cmp-text--subscription-popup--p">24 hours notice is required for pausing or resuming a subscription order.</p>
          <p className="cmp-text--subscription-popup--p">Select how long to pause your subscription <span className="cmp-text__bold-font">from today</span></p>
          <div className="cmp-container--subscription-popup--order-dropdown">
            <select className="cmp-input--subscription-popup--order--select">
              <option>1 Order - Resume on Jul 15, 2021</option>
              <option>2 Order - Resume on Jul 26, 2021</option>
              <option>3 Order - Resume on Aug 04, 2021</option>
            </select>
          </div>
          <div className="cmp-container--subscription-popup--order-buttons">
            <button className="cmp-btn--subscription-popup--proceed-btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

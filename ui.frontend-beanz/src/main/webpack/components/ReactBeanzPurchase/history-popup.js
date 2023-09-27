import React from 'react'

export default function HistoryPopup() {
  return (
    <div id="id-order-history" className="change-coffee-popup order-history">
      <div className="add-to-cart-popup--main-content">
        <div className="add-to-cart-popup--container">
          <div className="add-to-cart-popup--close">
            <button onClick={selectCoffeeClose} id="add-to-cart-popup-close" className="add-to-cart-popup--close-button"></button>
          </div>
          <div className="cmp-text--add-to-cart-heading">History</div>
          <div className="add-to-cart-popup--content">
            <div className="add-to-cart-popup-content--details">
              <div className="cmp-containe__history-popup--content-box">
                <div className="cmp-container__history-popup--content-item">
                  <div className="cmp-container__history-popup--content-item-media">
                    <img className="cmp-image__history-popup--media-img" src="https://breville-production-aem-assets.s3-us-west-2.amazonaws.com/Beanz+Marketpace+Coffee+bags/reko.madcap-600/tile.jpg" />
                    <div className="cmp-container__history-popup--media-body">
                      <div className="cmp-text__history-popup--media-title"><span className="brown-font">Sparrows Coffee</span><span>All Seasons Blend</span></div>
                      <p className="cmp-text__history-popup--media-p">MONTHLY  |  2 x 12OZ BAG  |  POUR OVER</p>
                    </div>
                  </div>

                  <div className="cmp-container__history-popup--content-item-details collapsed">
                    <div className="cmp-container__history-popup--content-item-row panel-head">
                      <span className="cmp-text-purchase__content--box-toggle-arrow"></span>
                      <div className="cmp-container__history-popup--content-item-col-6">
                        <p className="cmp-text__history-popup--content-item-label">Order No.</p>
                        <p className="cmp-text__history-popup--content-item-p">XXXXXXXXXXXX</p>
                      </div>
                      <div className="cmp-container__history-popup--content-item-col-6">
                        <p className="cmp-text__history-popup--content-item-label">SHIP Date </p>
                        <p className="cmp-text__history-popup--content-item-p">XXXXXXXXXXXX</p>
                      </div>
                    </div>
                    <div className="cmp-container__history-popup--collapsed-panel">
                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-12 section-ships-to">
                          <p className="cmp-text__history-popup--content-item-label">SHIPS TO</p>
                          <p className="cmp-text__history-popup--content-item-p">Paul Drummond, Breville USA, 19400 S Western Ave, Torrance, CA 90501, United States </p>
                        </div>
                      </div>

                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-12 section-billed-to">
                          <p className="cmp-text__history-popup--content-item-label">BILLED TO</p>
                          <p className="cmp-text__history-popup--content-item-p">Paul Drummond, Breville USA, 19400 S Western Ave, Torrance, CA 90501, United States </p>
                        </div>
                      </div>

                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-6 payment">
                          <p className="cmp-text__history-popup--content-item-label">PAYMENT</p>
                          <p className="cmp-text__history-popup--content-item-p"><span className="cmp-text__bold-font">$39.90,</span> PayPal </p>
                        </div>
                        <div className="cmp-container__history-popup--content-item-col-6">
                          <p className="cmp-text__history-popup--content-item-label">PAYMENT DATE </p>
                          <p className="cmp-text__history-popup--content-item-p">XX/XX/XXXX</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cmp-container__history-popup--content-item-details">
                    <div className="cmp-container__history-popup--content-item-row panel-head">
                      <span className="cmp-text-purchase__content--box-toggle-arrow"></span>
                      <div className="cmp-container__history-popup--content-item-col-6">
                        <p className="cmp-text__history-popup--content-item-label">Order No.</p>
                        <p className="cmp-text__history-popup--content-item-p">XXXXXXXXXXXX</p>
                      </div>
                      <div className="cmp-container__history-popup--content-item-col-6">
                        <p className="cmp-text__history-popup--content-item-label">SHIP Date </p>
                        <p className="cmp-text__history-popup--content-item-p">XXXXXXXXXXXX</p>
                      </div>
                    </div>
                    <div className="cmp-container__history-popup--collapsed-panel">
                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-12 section-ships-to">
                          <p className="cmp-text__history-popup--content-item-label">SHIPS TO</p>
                          <p className="cmp-text__history-popup--content-item-p">Paul Drummond, Breville USA, 19400 S Western Ave, Torrance, CA 90501, United States </p>
                        </div>
                      </div>

                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-12 section-billed-to">
                          <p className="cmp-text__history-popup--content-item-label">BILLED TO</p>
                          <p className="cmp-text__history-popup--content-item-p">Paul Drummond, Breville USA, 19400 S Western Ave, Torrance, CA 90501, United States </p>
                        </div>
                      </div>

                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-6 payment">
                          <p className="cmp-text__history-popup--content-item-label">PAYMENT</p>
                          <p className="cmp-text__history-popup--content-item-p"><span className="cmp-text__bold-font">$39.90,</span> PayPal </p>
                        </div>
                        <div className="cmp-container__history-popup--content-item-col-6">
                          <p className="cmp-text__history-popup--content-item-label">PAYMENT DATE </p>
                          <p className="cmp-text__history-popup--content-item-p">XX/XX/XXXX</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cmp-container__history-popup--content-item-details">
                    <div className="cmp-container__history-popup--content-item-row panel-head">
                      <span className="cmp-text-purchase__content--box-toggle-arrow"></span>
                      <div className="cmp-container__history-popup--content-item-col-6">
                        <p className="cmp-text__history-popup--content-item-label">Order No.</p>
                        <p className="cmp-text__history-popup--content-item-p">XXXXXXXXXXXX</p>
                      </div>
                      <div className="cmp-container__history-popup--content-item-col-6">
                        <p className="cmp-text__history-popup--content-item-label">SHIP Date </p>
                        <p className="cmp-text__history-popup--content-item-p">XXXXXXXXXXXX</p>
                      </div>
                    </div>
                    <div className="cmp-container__history-popup--collapsed-panel">
                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-12 section-ships-to">
                          <p className="cmp-text__history-popup--content-item-label">SHIPS TO</p>
                          <p className="cmp-text__history-popup--content-item-p">Paul Drummond, Breville USA, 19400 S Western Ave, Torrance, CA 90501, United States </p>
                        </div>
                      </div>

                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-12 section-billed-to">
                          <p className="cmp-text__history-popup--content-item-label">BILLED TO</p>
                          <p className="cmp-text__history-popup--content-item-p">Paul Drummond, Breville USA, 19400 S Western Ave, Torrance, CA 90501, United States </p>
                        </div>
                      </div>

                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-6 payment">
                          <p className="cmp-text__history-popup--content-item-label">PAYMENT</p>
                          <p className="cmp-text__history-popup--content-item-p"><span className="cmp-text__bold-font">$39.90,</span> PayPal </p>
                        </div>
                        <div className="cmp-container__history-popup--content-item-col-6">
                          <p className="cmp-text__history-popup--content-item-label">PAYMENT DATE </p>
                          <p className="cmp-text__history-popup--content-item-p">XX/XX/XXXX</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cmp-container__history-popup--content-item-details">
                    <div className="cmp-container__history-popup--content-item-row panel-head">
                      <span className="cmp-text-purchase__content--box-toggle-arrow"></span>
                      <div className="cmp-container__history-popup--content-item-col-6">
                        <p className="cmp-text__history-popup--content-item-label">Order No.</p>
                        <p className="cmp-text__history-popup--content-item-p">XXXXXXXXXXXX</p>
                      </div>
                      <div className="cmp-container__history-popup--content-item-col-6">
                        <p className="cmp-text__history-popup--content-item-label">SHIP Date </p>
                        <p className="cmp-text__history-popup--content-item-p">XXXXXXXXXXXX</p>
                      </div>
                    </div>
                    <div className="cmp-container__history-popup--collapsed-panel">
                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-12 section-ships-to">
                          <p className="cmp-text__history-popup--content-item-label">SHIPS TO</p>
                          <p className="cmp-text__history-popup--content-item-p">Paul Drummond, Breville USA, 19400 S Western Ave, Torrance, CA 90501, United States </p>
                        </div>
                      </div>

                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-12 section-billed-to">
                          <p className="cmp-text__history-popup--content-item-label">BILLED TO</p>
                          <p className="cmp-text__history-popup--content-item-p">Paul Drummond, Breville USA, 19400 S Western Ave, Torrance, CA 90501, United States </p>
                        </div>
                      </div>

                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-6 payment">
                          <p className="cmp-text__history-popup--content-item-label">PAYMENT</p>
                          <p className="cmp-text__history-popup--content-item-p"><span className="cmp-text__bold-font">$39.90,</span> PayPal </p>
                        </div>
                        <div className="cmp-container__history-popup--content-item-col-6">
                          <p className="cmp-text__history-popup--content-item-label">PAYMENT DATE </p>
                          <p className="cmp-text__history-popup--content-item-p">XX/XX/XXXX</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cmp-container__history-popup--content-item-details">
                    <div className="cmp-container__history-popup--content-item-row panel-head">
                      <span className="cmp-text-purchase__content--box-toggle-arrow"></span>
                      <div className="cmp-container__history-popup--content-item-col-6">
                        <p className="cmp-text__history-popup--content-item-label">Order No.</p>
                        <p className="cmp-text__history-popup--content-item-p">XXXXXXXXXXXX</p>
                      </div>
                      <div className="cmp-container__history-popup--content-item-col-6">
                        <p className="cmp-text__history-popup--content-item-label">SHIP Date </p>
                        <p className="cmp-text__history-popup--content-item-p">XXXXXXXXXXXX</p>
                      </div>
                    </div>
                    <div className="cmp-container__history-popup--collapsed-panel">
                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-12 section-ships-to">
                          <p className="cmp-text__history-popup--content-item-label">SHIPS TO</p>
                          <p className="cmp-text__history-popup--content-item-p">Paul Drummond, Breville USA, 19400 S Western Ave, Torrance, CA 90501, United States </p>
                        </div>
                      </div>

                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-12 section-billed-to">
                          <p className="cmp-text__history-popup--content-item-label">BILLED TO</p>
                          <p className="cmp-text__history-popup--content-item-p">Paul Drummond, Breville USA, 19400 S Western Ave, Torrance, CA 90501, United States </p>
                        </div>
                      </div>

                      <div className="cmp-container__history-popup--content-item-row">
                        <div className="cmp-container__history-popup--content-item-col-6 payment">
                          <p className="cmp-text__history-popup--content-item-label">PAYMENT</p>
                          <p className="cmp-text__history-popup--content-item-p"><span className="cmp-text__bold-font">$39.90,</span> PayPal </p>
                        </div>
                        <div className="cmp-container__history-popup--content-item-col-6">
                          <p className="cmp-text__history-popup--content-item-label">PAYMENT DATE </p>
                          <p className="cmp-text__history-popup--content-item-p">XX/XX/XXXX</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

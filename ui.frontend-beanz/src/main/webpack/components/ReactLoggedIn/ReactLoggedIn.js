import React, { useState } from 'react'
import { object } from 'prop-types'
import { withAem } from 'library/utils/withAem'
import ArrowRight from '../../resources/svgs/arrow-right.svg';
import CallUs from '../../resources/svgs/callus_P_16.svg';
import ExternalLink from '../../resources/svgs/External-Link-Icon.svg';


const ReactLoggedIn = ({ aemData }) => {
  const [resultsroastersproducts, setRoastersProducts] = useState([])
  const [resultscategories, setCategories] = useState([])
  const [initResult, setInitProd] = useState([])
  const [initSuggestion, setInitSuggestion] = useState([])
  const [roasterList, setRoasterList] = useState([])


  return (
    <div>
      <div className="container responsivegrid navigation-logged-in--account-container">
        <div className="cmp-container">
          <div className="cmp-title">
            <div data-cmp-data-layer="{&quot;title-48fbadff9e&quot;:{&quot;@type&quot;:&quot;breville-brands/components/title&quot;,&quot;repo:modifyDate&quot;:&quot;2021-03-19T16:43:41Z&quot;,&quot;dc:title&quot;:&quot;My Beanz&quot;}}" className="cmp-title">
              <div className="cmp-title__text">{ aemData.myBeanzLabel }</div>
            </div>
          </div>
          <div className="cmp-container-loggedin__content">
            <p className='cmp-text-my-beanz__email'>myemailid@gmail.com</p>
            <div className='cmp-container-my-beanz__contents'>
            <ul className='cmp-container-my-beanz__content--ul'>
                <p className='cmp-text-my-beanz__content--header'>{ aemData.purchaseAndAppliancesLabel }</p>
                <li className="cmp-container-my-beanz__content--li"><a href={ aemData.orderPagePath } className='cmp-text-my-beanz__content--a'>{ aemData.orderlabel } <span className='cmp-icon-my-beanz__content--icons'><ArrowRight /></span></a></li>
                <li className="cmp-container-my-beanz__content--li"><a href={ aemData.subscriptionPagePath } className='cmp-text-my-beanz__content--a'>{ aemData.subscriptionlabel } <span className='cmp-icon-my-beanz__content--icons'><ArrowRight /></span></a></li>
              </ul>

              <ul className='cmp-container-my-beanz__content--ul'>
                <p className='cmp-text-my-beanz__content--header'>{ aemData.accountDetaiLabel }</p>
                <li className="cmp-container-my-beanz__content--li"><a href={ aemData.personalDetailPagePath } className='cmp-text-my-beanz__content--a'>{ aemData.personalDetaillabel } <span className='cmp-icon-my-beanz__content--icons'><ArrowRight /></span></a></li>
              </ul>

              <ul className='cmp-container-my-beanz__content--ul'>
                <p className='cmp-text-my-beanz__content--header'>{ aemData.helpAndSupportLabel }</p>
                <li className="cmp-container-my-beanz__content--li">
                  <a href={ aemData.callNowLink } className='cmp-text-my-beanz__content--a'>{ aemData.callUslabel } { aemData.callNumber }
                  <span className='cmp-text-my-beanz__content--a--call-now'>Call Now</span>
                  <span className='cmp-icon-my-beanz__content--icons'><CallUs /></span>
                </a>
                </li>
                <li className="cmp-container-my-beanz__content--li"><a href={ aemData.createSupportTicketPath } className='cmp-text-my-beanz__content--a'>{ aemData.createSupportTicketLabel } <span className='cmp-icon-my-beanz__content--icons'><ExternalLink /></span></a></li>
                <li className="cmp-container-my-beanz__content--li"><a href={ aemData.updateASupportTicketPath } className='cmp-text-my-beanz__content--a'>{ aemData.updateASupportTicketLabel } <span className='cmp-icon-my-beanz__content--icons'><ExternalLink /></span></a></li>
              </ul>

              <p className="cmp-text-my-beanz__contact-time">{ aemData.availabilityText }</p>
            </div>
          </div>

          <div className="cmp-button-logged-in__button">
            <button type="button" className="cmp-button auth-logout">
              <span className="cmp-button__text">Logout</span>
            </button>
          </div>

          <div class="button close-logged-in-popup">
            <button type="button" className="cmp-button cmp-button-logged-in__popup--close-btn">
              <span className="cmp-button__text">Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactLoggedIn.propTypes = {
  aemData: object
}

export default withAem(ReactLoggedIn)

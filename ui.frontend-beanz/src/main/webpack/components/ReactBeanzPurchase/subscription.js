import React, { useState, useEffect} from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

//LOADER
import { BeanzSpinner } from '../ReactCart/BeanzSpinner';

//Dummy History Json Object
import historyData from './dummyHistory.js';
import BundleInfo from './bundleInfo.js';

//Coffee Selection Popup
import { CoffeeSelection } from './coffeeSelection';

//REDUX IMPORTS
import { pauseNextdates, pauseSubscription, cancelSubscription, resumeSubscription } from 'library/store/subscription/actions';
import { selectIsLoading, selectResults, selectNextDates} from 'library/store/subscription/selector';

export default function Subscription({subscription,aemData}) {
  const billingAddress = subscription.billingAddress;
  const shippingAddress = subscription.shippingAddress;
  const currency = subscription.currency;
  const grind = subscription.grind;
  const nextdeliverydate = subscription.nextdeliverydate;
  const paymenttype = subscription.paymenttype;
  const plandetails = subscription.plandetails; // Array
  const quantity = subscription.quantity;
  const status = subscription.status;
  const storecode = subscription.storecode;
  const skucode = subscription.skucode;
  const isdynamicBundle = subscription.isPartOfDynamicBundle;
  const quantityshipped = subscription.totalQuantityShipped;
  const quantityshippedstr = ''+quantityshipped;

  const standingorderid = subscription.standingorderid;

  const promotionaldiscount = subscription.promotionaldiscount;
  const promotionaldiscountamount = subscription.promotionaldiscountamount;
  const subscriptionunitprice = subscription.subscriptionunitprice;
  const subscriptionunitamount = subscription.subscriptionunitamount;
  const subscriptionprice = subscription.subscriptionprice;
  const subscriptionamount = subscription.subscriptionamount;
  const tax = subscription.tax;
  const taxamount = subscription.taxamount;
  const totalamount = subscription.totalamount;
  const total = subscription.total;

  const imgSrc = subscription.tileImageUrl;
  const productNameList = subscription.productName;
  let productNameReturn;
  const USLocale = 'en-US';
  if(productNameList == undefined) {
       productNameReturn = "";
      } else {
        productNameList.map((product, index)=> {
          if(product.locale == USLocale) {
            productNameReturn = product.value;
          }
        });
      }

  const bagValueList = subscription.bagSize;
  let bagValue;
  bagValueList.map((bag, index) => {
    if(bag.locale == USLocale){
      bagValue = bag.value
    }
  });


  const dispatch = useDispatch();

  const [collapse, setCollapse] = useState(true);

  // Subscription Pop Up logic
  const [nextDatesData, setNextDatesData] = useState([]);
  let [pauseSubParams, setPauseSubParams] = useState('');
  const [flag, setFlag] = useState(false);
  const [iterationnew, setIterationnew] = useState();
  const [pauseDateValue, setPauseDateValue] = useState();

  const [subHistory, setSubHistory] = useState([]);
  const [historyFlag, setHistoryFlag] = useState(true);

  //History Obejct
  const [historyPopupData, setHistoryPopupData] = useState({});

  const pauseNextDatesSelector = useSelector( selectNextDates );
  const isLoading = useSelector( selectIsLoading );


  const displayName = ()=> {
    /*** Extracting planid from SKU Code using Regex functions */
    const myRegexp = /_(.*)/;
    const match = myRegexp.exec(skucode); //O/P: PLAN_WEEKLY_1 like that

    const matchedPlanDetails = plandetails.filter(i => match.includes(i.planid));
    return matchedPlanDetails[0].displayvalues[0].displayname; // returning displayname from displayvalues array
  }

  const skuLastDigit = skucode.charAt(skucode.length-1);

  /** Formatting the date using moment */
  const formattedDate = (nextdeliverydate) => {
    // let fDate = new Date();
    return moment(nextdeliverydate).format('MMMM DD, YYYY');
  }

  /** Accordion Toggle */
  const toggleItems = () => {
    setCollapse(prevCollapse => !prevCollapse);
  }

   /***
   * Coffee Popup Logic
   */
    const popup = window.location.search;
    const urlParams = new URLSearchParams( popup );
    let popupboolean = urlParams.get( 'popupTerm' );
    if(popupboolean){
      const selectCoffeeContainer = document.querySelector('#id-select-coffee');
      if(selectCoffeeContainer){
        selectCoffeeContainer.classList.add("shown");
      }
      const bodyClass = document.querySelector('body');
      if(bodyClass){
        bodyClass.classList.add('modal-open');
      }
      window.history.replaceState({}, document.title, window.location.href.split('?')[0]+"#subscriptions");
    }

    const openCoffeeSelectPopup = (e) => {
      localStorage.setItem('standingorderid', standingorderid);
      localStorage.setItem('skucode', skucode);
      openCoffeeSelectPopupOpen(e);
    }
    
    const openPopup = (e) => {
      const orderHelpPopup = document.querySelector('.cmp-container--order-help');
      if(orderHelpPopup){
        orderHelpPopup.classList.add("shown");
      }
      const bodyClass = document.querySelector('body');
      if(bodyClass){
        bodyClass.classList.add('modal-open');
      }
    }

    const orderHelpClose = document.querySelector('.cmp-btn--order-help-close');
    if(orderHelpClose){
      orderHelpClose.addEventListener('click', () => {
        const orderHelpPopup = document.querySelector('.cmp-container--order-help');
        if(orderHelpPopup){
          orderHelpPopup.classList.remove("shown");
        }
        const bodyClass = document.querySelector('body');
        if(bodyClass){
          bodyClass.classList.remove('modal-open');
        }
      });
    }

    function openCoffeeSelectPopupOpen(e){
      const selectCoffeeContainer = document.querySelector('#id-select-coffee');
      if(selectCoffeeContainer){
        selectCoffeeContainer.classList.add("shown");
      }
      const bodyClass = document.querySelector('body');
      if(bodyClass){
        bodyClass.classList.add('modal-open');
      }
    }

  const RenderButtons = ({status})=> {
    let buttons = '';
    if(status == 'Active' || status == 'ACTIVE') {
      buttons = <> 
        <button type="button" className="cmp-button-purchase__button pause-btn" onClick={pauseSubscriptionBtn}>Pause</button>
        <button type="button" className="cmp-button-purchase__button history-btn" onClick={historySubscriptionBtn}>History</button>
        <button type="button" className="cmp-button-purchase__button cancel-btn" onClick={cancelSubscriptionBtn}>Cancel subscription</button>
      </>
    }
    if(status == 'Cancelled' || status == 'CANCELLED') {
      buttons = null;
    }

    if(status == 'Paused' || status == 'PAUSED') { //Resume Buttons
      buttons = <>
        <button type="button" className="cmp-button-purchase__button pause-btn" onClick={resumeSubscriptionBtn}>Edit Pause</button>
        <button type="button" className="cmp-button-purchase__button history-btn" onClick={historySubscriptionBtn}>History</button>
        <button type="button" className="cmp-button-purchase__button float-sm-right cancel-btn" onClick={cancelSubscriptionBtn}>Cancel subscription</button>
      </>
    }

    return buttons;
  }


  const RenderTitle = ({status}) => {
    let title = '';
    switch(status) {
      case 'ACTIVE':
        return (
          <>
            <p className="cmp-text-purchase__content--box-order-head--title">NEXT ORDER</p>
            <p className="cmp-text-purchase__content--box-order-head--p">{formattedDate(nextdeliverydate)}</p>
          </>
        );
      case 'PAUSED':
        return (
          <>
            <p className="cmp-text-purchase__content--box-order-head--title font-rosso-corsa">PAUSED</p>
            <p className="cmp-text-purchase__content--box-order-head--p font-rosso-corsa" >NEXT ORDER</p>
            <p className="cmp-text-purchase__content--box-order-head--p">{formattedDate(nextdeliverydate)}</p>
          </>
        );
      case 'CANCELLED':
        return (
          <>
            <p className="cmp-text-purchase__content--box-order-head--title font-rosso-corsa">CANCELLED</p>
          </>
        );
      default:
        return null;
    }
  }

  const RenderCoffe = ({status})=> {
    let buttons = '';
    if(status == 'CANCELLED' || status == 'Cancelled') {
      buttons = null;
    } else {
      buttons = <>
        <button type="button" onClick={openCoffeeSelectPopup} className="cmp-button-purchase__button select-coffee-btn">Change coffee</button>
      </>
    }
    return buttons;
  }


  const SelectOptions = () => {
    return (
      <>
      <div className="cmp-container--subscription-popup--body">
          <p className="cmp-text--subscription-popup--p">24 hours notice is required for pausing a subscription order.</p>
          <p className="cmp-text--subscription-popup--p">Select how long to pause your subscription</p>
          
          <div className="cmp-container--subscription-popup--order-dropdown">
            <select className="cmp-input--subscription-popup--order--select" onChange={handleDropdownChange}>
              {
                nextDatesData.map((data, key) => {
                  return (<option key={ key } value={data.iteration}>{data.iteration} Resume on {data.date}</option>);
                })
              }
            </select>
          </div>
          <div className="cmp-container--subscription-popup--order-buttons">
            <button className="cmp-btn--subscription-popup--decline-btn" onClick={pausepopupClose}>No, don't pause it</button>
            <button className="cmp-btn--subscription-popup--proceed-btn" onClick={pauseSubscriptionCall}>Yes, pause it</button>
          </div>
        </div>
      </>
    )
  }

  const NoData = () => {
    return (
      <>
        <div className="cmp-container--subscription-popup--no-data text-center">No Data Found for this Subscription.</div>
      </>
    )
  }

  /*****
   * Pause Subscription API Dispatch
   */

   const handleDropdownChange = (e) => {
    let value = nextDatesData.filter(function (item) {
      return item.iteration == e.target.value;
    })
    setPauseDateValue(value);
    setIterationnew(value[0].iteration);
  }

  const pauseSubscriptionBtn = (e) => {
    openPauseSubPopup(e);
    standingOrderId(standingorderid);
    dispatch( pauseNextdates(standingorderid) );
    
  }

  useEffect( ()=>{
    if(pauseNextDatesSelector) {
      setNextDatesData(pauseNextDatesSelector);
    }
  }, [pauseNextDatesSelector] );

  const pauseSubscriptionCall = () => {
    setFlag(prevFlag => !prevFlag);
    let PauseSubParams = {
      iteration_number: iterationnew || 1,
      pausedate: pauseDateValue || moment(new Date()).format("YYYY-MM-DD"),
      resume_subscription: "false",
      standing_order_id: soi.toString(),
    };
    dispatch(pauseSubscription(PauseSubParams));
    pausepopupClose();
  };

  

  function openPauseSubPopup(e){
    const selectCoffeeContainer = document.querySelector('#pause-subscription-popup');
    if(selectCoffeeContainer){
      selectCoffeeContainer.classList.add("shown");
    }
    const bodyClass = document.querySelector('body');
    if(bodyClass){
      bodyClass.classList.add('modal-open');
    }
  }

  function pausepopupClose(e){
    const selectCoffeeContainer = document.querySelector('#pause-subscription-popup');
      if(selectCoffeeContainer){
        selectCoffeeContainer.classList.remove('shown');
      }
    const bodyClass = document.querySelector('body');
      if(bodyClass){
        bodyClass.classList.remove('modal-open');
      }
    // e.preventDefault();
  }



   /***** 
   * Cancel Subscription Logics
   * *****/

  const cancelSubscriptionBtn = (e) => {
    if(isdynamicBundle == true && quantityshipped < 12){
      openBundleSubscriptionPopup(e);
    }else {
      openCancelSubPopup(e);
    }
    standingOrderId(standingorderid);
  }

  const cancelSubscriptionCall = () => {
    let cancelSubParams = {
      standing_order_action: "Cancelled",
      standing_order_id: soi.toString(),
    }
    dispatch(cancelSubscription(cancelSubParams));
    cancelPopupClose();
  }

  function openCancelSubPopup(e){
    const selectCoffeeContainer = document.querySelector('#cancel-subscription-popup');
    if(selectCoffeeContainer){
      selectCoffeeContainer.classList.add("shown");
    }
    const bodyClass = document.querySelector('body');
    if(bodyClass){
      bodyClass.classList.add('modal-open');
    }
    // e.preventDefault();
  }

  function openBundleSubscriptionPopup(e){
    const bundleSubscription = document.querySelector('#id-bundle-subscription');
    if(bundleSubscription){
      bundleSubscription.classList.add("shown");
    }
    const bodyClass = document.querySelector('body');
    if(bodyClass){
      bodyClass.classList.add('modal-open');
    }
    // e.preventDefault();
  }

  function cancelPopupClose(e){
    const selectCoffeeContainer = document.querySelector('#cancel-subscription-popup');
      if(selectCoffeeContainer){
        selectCoffeeContainer.classList.remove('shown');
      }
    const bodyClass = document.querySelector('body');
      if(bodyClass){
        bodyClass.classList.remove('modal-open');
      }
    // e.preventDefault();
  }


  /***** 
   * Resume Subscription Logics
   * *****/
  const resumeSubscriptionBtn = (e) => {
    openResumeSubPopup(e);
    standingOrderId(standingorderid);
    dispatch(pauseNextdates(standingorderid));
  }

  const resumeSubscriptionCall = (e) => {
    let resumeSubParams = {
      iteration_number: iterationnew || 1,
      pausedate: moment(new Date()).format("YYYY-MM-DD"),
      resume_subscription: "true",
      standing_order_id: soi.toString(),
    };
    dispatch(resumeSubscription(resumeSubParams));
    resumePopupClose();
  }

  const defaultResumeOption = () => {
    const option = <>
      <option key="0" value="0"> Resume Subscription now</option>
    </>
  }

  function openResumeSubPopup(e){
    const selectCoffeeContainer = document.querySelector('#resume-subscription-popup');
    if(selectCoffeeContainer){
      selectCoffeeContainer.classList.add("shown");
    }
    const bodyClass = document.querySelector('body');
    if(bodyClass){
      bodyClass.classList.add('modal-open');
    }
    // e.preventDefault();
  }

  function resumePopupClose(e){
    const selectCoffeeContainer = document.querySelector('#resume-subscription-popup');
      if(selectCoffeeContainer){
        selectCoffeeContainer.classList.remove('shown');
      }
    const bodyClass = document.querySelector('body');
      if(bodyClass){
        bodyClass.classList.remove('modal-open');
      }
    // e.preventDefault();
  }


  /****
   * History Buttons Logic
   */
   const historySubscriptionBtn = (e) => {
    filterOutHistory(standingorderid);
    setHistoryPopupData({
      imgSrc: imgSrc,
      productNameReturn
    })
    openHistoryPopup(e);
  }

  const filterOutHistory = (standingorderid) => {
    filterArray = [];
    historyData.map((item)=> {
      item.Items.map((i)=> {
        if(standingorderid == parseInt(i.EPStandingOrderId)){
          filterArray.push(item);
        }
      })
    });
    setSubHistory(() => {
      return filterArray;
    });
  }

  function openHistoryPopup(e){
    const selectCoffeeContainer = document.querySelector('#id-order-history');
    if(selectCoffeeContainer){
      selectCoffeeContainer.classList.add("shown");
    }
    const bodyClass = document.querySelector('body');
    if(bodyClass){
      bodyClass.classList.add('modal-open');
    }
  }

  function historyPopupClose(e){
    const selectCoffeeContainer = document.querySelector('#id-order-history');
      if(selectCoffeeContainer){
        selectCoffeeContainer.classList.remove('shown');
      }
    const bodyClass = document.querySelector('body');
      if(bodyClass){
        bodyClass.classList.remove('modal-open');
      }
  }
  

   return (
     <div>
      <div className="cmp-container-purchase__content" id="subscription-main">
      <div className={`cmp-container-purchase__content--box ${
        collapse ? 'collapsed' : 'null'
      }`}>
        <div className="cmp-container-purchase__content--box-head">
          <p className="cmp-text-purchase__content--box-head--title">
            {productNameReturn}
          </p>
          <p className="cmp-text-purchase__content--box-head--sub-title">
            {/* 2 X 12 OZ BAGS 2 WEEKS WHOLE BEAN */}
            {quantity} X {bagValue} BAGS {displayName()} {grind}  
          </p>
          <span onClick={toggleItems} className="cmp-text-purchase__content--box-toggle-arrow"></span>
        </div>

        <div className="cmp-container-purchase__content--box-row">
          <div className="cmp-container-purchase__content--box-column">
            <div className="cmp-container-purchase__content--box-order-detials">
              <div className="cmp-container-purchase__content--box-order-head font-purple">
                <RenderTitle status={status} />
                <button className="cmp-text-purchase__content--box-order-info" onClick={openPopup}>?</button>
              </div>

              <div className="cmp-container-purchase__content--box-order-detials-item">
                <img src={imgSrc} className='cmp-image-purchase__content--box-order-detials-item--image' />
                <div className="cmp-container-purchase__content--box-order-detials-item--details">
                  <div className="cmp-container-purchase__content--box--edit-box order-details">
                    <p className="cmp-text-purchase__content--box--edit-box--title">ORDER</p>
                    <p className="cmp-text-purchase__content--box--edit-box--edit">EDIT</p>
                  </div>
                  <p className="cmp-text-purchase__content--box--title-p">{aemData.everyLbl}</p>
                  <p className="cmp-text-purchase__content--box--content-p">{skuLastDigit} Weeks</p>
                  <p className="cmp-text-purchase__content--box--title-p">{aemData.sendMeLbl}</p>
                  <p className="cmp-text-purchase__content--box--content-p">{quantity} X {bagValue} Bags</p>
                  <p className="cmp-text-purchase__content--box--title-p">{aemData.grindLbl}</p>
                  <p className="cmp-text-purchase__content--box--content-p">{grind}</p>
                </div>
              </div>
              <div className="cmp-container-purchase__content--change-cofffee-button">
                <RenderCoffe status= {status} />
              </div>
              
              <div className="cmp-container-purchase__content--box--order-price-details">
                <ul className="cmp-container-purchase__content--box--order-price-details--ul">
                  <li className="cmp-container-purchase__content--box--order-price-details--li">Cost</li>
                  <li className="cmp-container-purchase__content--box--order-price-details--li">{quantity} x ${subscriptionunitamount}</li>
                </ul>

                <ul className="cmp-container-purchase__content--box--order-price-details--ul">
                  <li className="cmp-container-purchase__content--box--order-price-details--li">Discount</li>
                  <li className="cmp-container-purchase__content--box--order-price-details--li">${promotionaldiscountamount}</li>
                </ul>
                <ul className="cmp-container-purchase__content--box--order-price-details--ul">
                  <li className="cmp-container-purchase__content--box--order-price-details--li">Shipping</li>
                  <li className="cmp-container-purchase__content--box--order-price-details--li">$0.00</li>
                </ul>
                <ul className="cmp-container-purchase__content--box--order-price-details--ul">
                  <li className="cmp-container-purchase__content--box--order-price-details--li">Taxes</li>
                  <li className="cmp-container-purchase__content--box--order-price-details--li">${taxamount}</li>
                </ul>
                <ul className="cmp-container-purchase__content--box--order-price-details--ul">
                  <li className="cmp-container-purchase__content--box--order-price-details--li order-sub-total">Sub Total</li>
                  <li className="cmp-container-purchase__content--box--order-price-details--li">${subscriptionamount}</li>
                </ul>
                <ul className="cmp-container-purchase__content--box--order-price-details--ul">
                  <li className="cmp-container-purchase__content--box--order-price-details--li order-total">Order Total	</li>
                  <li className="cmp-container-purchase__content--box--order-price-details--li">${totalamount} </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="cmp-container-purchase__content--box-column">
            <div className="cmp-container-purchase__content--box--shipping-address">
              <div className="cmp-container-purchase__content--box--edit-box shipping-address">
                <p className="cmp-text-purchase__content--box--edit-box--title">SHIPS TO</p>
                <p className="cmp-text-purchase__content--box--edit-box--edit">EDIT</p>
              </div>
              <p className="cmp-text-purchase__content--box--shipping-address-p">
                {shippingAddress.name} { shippingAddress.addressline1}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalcode}, {shippingAddress.country}
              </p>
            </div>

            <div className="cmp-container-purchase__content--box--billing-address">
              <div className="cmp-container-purchase__content--box--edit-box billing-address">
                <p className="cmp-text-purchase__content--box--edit-box--title">BILLED TO</p>
                <p className="cmp-text-purchase__content--box--edit-box--edit">EDIT</p>
              </div>
              <p className="cmp-text-purchase__content--box--billing-address-p">
                {billingAddress.name} {billingAddress.addressline1}, {billingAddress.city}, {billingAddress.state} {billingAddress.postalcode}, {billingAddress.country}
              </p>
            </div>

            <div className="cmp-container-purchase__content--box--payment">
              <div className="cmp-container-purchase__content--box--edit-box payment">
                <p className="cmp-text-purchase__content--box--edit-box--title">PAYMENT</p>
                <p className="cmp-text-purchase__content--box--edit-box--edit">EDIT</p>
              </div>
              <p className="cmp-text-purchase__content--box--payment-p">
                <strong>${totalamount}</strong> per delivery, {paymenttype}
              </p>
            </div>

            <div className="cmp-container-purchase__content--box--order-info">
              <p className="cmp-text-purchase__content--box--order-info-p">Recurring payments are taken on 24 hours prior to roast day</p>
              <p className="cmp-text-purchase__content--box--order-info-p">Amendments on existing subscriptions must be made 48 hours prior to roast day</p>
            </div>

          </div>
        </div>

        <div className="cmp-container-purchase__content--buttons">
          <RenderButtons status={status} />
        </div>

      </div>
    </div>
      

      {/* Pause Subscription Pop up */}
      <div id="pause-subscription-popup" className="cmp-container--subscription-popup">
        {isLoading && <BeanzSpinner/>}
      <div className="cmp-container--subscription-popup--content">
        <div className="cmp-container--subscription-popup--heading">
          <p className="cmp-text--subscription-popup--heading--title">Pause Subscription?</p>
          <span className="cmp-btn--subscription-popup-close" onClick={pausepopupClose}></span>
        </div>
        { parseInt(nextDatesData.length) > 0 ? 
          <SelectOptions /> : <NoData />
        }
      </div>
    </div>

    {/* Resume Subscription Pop up */}
    <div id="resume-subscription-popup" className="cmp-container--subscription-popup">
        {isLoading && <BeanzSpinner/>}
      <div className="cmp-container--subscription-popup--content">
        <div className="cmp-container--subscription-popup--heading">
          <p className="cmp-text--subscription-popup--heading--title">Edit pause</p>
          <span className="cmp-btn--subscription-popup-close" onClick={resumePopupClose}></span>
        </div>
        <div className="cmp-container--subscription-popup--body">
          <p className="cmp-text--subscription-popup--p">24 hours notice is required for pausing a subscription order.</p>
          <p className="cmp-text--subscription-popup--p">Select how long to pause your subscription from today</p>
          
          <div className="cmp-container--subscription-popup--order-dropdown">
            <select className="cmp-input--subscription-popup--order--select" onChange={handleDropdownChange}>
              {
                defaultResumeOption(),
                nextDatesData.map((data, key) => {
                  return (
                    <option key={ key } value={data.iteration}>{data.iteration} Resume on {data.date}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="cmp-container--subscription-popup--order-buttons text-center">
            <button className="cmp-btn--subscription-popup--proceed-btn" onClick={resumeSubscriptionCall}>Save</button>
          </div>
        </div>
      </div>
    </div>

    {/* Cancel Subscription Pop up */}
    <div id="cancel-subscription-popup" className="cmp-container--subscription-popup">
        {isLoading && <BeanzSpinner/>}
      <div className="cmp-container--subscription-popup--content">
        <div className="cmp-container--subscription-popup--heading">
          <p className="cmp-text--subscription-popup--heading--title">Cancel Subscription?</p>
          <span className="cmp-btn--subscription-popup-close" onClick={cancelPopupClose}></span>
        </div>
        <div className="cmp-container--subscription-popup--body">
          <p className="cmp-text--subscription-popup--p">Cancels the next and all following orders.</p>
          <p className="cmp-text--subscription-popup--p">You can always create it again later.</p>
          <div className="cmp-container--subscription-popup--order-buttons">
            <button className="cmp-btn--subscription-popup--decline-btn" onClick={cancelPopupClose}>No, keep it</button>
            <button className="cmp-btn--subscription-popup--proceed-btn" onClick={cancelSubscriptionCall}>Yes, cancel it</button>
          </div>
        </div>
      </div>
    </div>


    {/* History Pop up */}
    <div id="id-order-history" className="change-coffee-popup order-history">
      <div className="add-to-cart-popup--main-content">
        <div className="add-to-cart-popup--container">
          <div className="add-to-cart-popup--close">
            <button onClick={historyPopupClose} id="add-to-cart-popup-close" className="add-to-cart-popup--close-button"></button>
          </div>
          <div className="cmp-text--add-to-cart-heading">History</div>
          <div className="add-to-cart-popup--content">
            <div className="add-to-cart-popup-content--details">
              <div className="cmp-containe__history-popup--content-box">
                <div className="cmp-container__history-popup--content-item">
                  <div className="cmp-container__history-popup--content-item-media">
                    <img className="cmp-image__history-popup--media-img" src={historyPopupData.imgSrc}/>
                    <div className="cmp-container__history-popup--media-body">
                      <div className="cmp-text__history-popup--media-title"><span className="brown-font">{productNameReturn}</span><span>{grind}</span></div>
                      <p className="cmp-text__history-popup--media-p">{displayName()} | {quantity} X {bagValue} OZ BAGS | {grind}</p>
                    </div>
                  </div>

                  {
                    ( subHistory?.length > 0 ) && subHistory.map((item, index) => {
                      return  (
                        <>
                          <div className="cmp-container__history-popup--content-item-details collapsed" key={ index }>
                            <div className="cmp-container__history-popup--content-item-row panel-head">
                              <span className="cmp-text-purchase__content--box-toggle-arrow"></span>
                              <div className="cmp-container__history-popup--content-item-col-6">
                                <p className="cmp-text__history-popup--content-item-label">Order No.</p>
                                <p className="cmp-text__history-popup--content-item-p">{item.OrderNumber}</p>
                              </div>
                              <div className="cmp-container__history-popup--content-item-col-6">
                                <p className="cmp-text__history-popup--content-item-label">SHIP Date </p>
                                <p className="cmp-text__history-popup--content-item-p">{item.ShippedDate}</p>
                              </div>
                            </div>
                            <div className="cmp-container__history-popup--collapsed-panel">
                              <div className="cmp-container__history-popup--content-item-row">
                                <div className="cmp-container__history-popup--content-item-col-12 section-ships-to">
                                  <p className="cmp-text__history-popup--content-item-label">SHIPS TO</p>
                                  <p className="cmp-text__history-popup--content-item-p">{item.ShippingContactName}, {item.ShippingCity}, {item.ShippingStreet}, {item.ShippingState}, {item.ShippingStateCode} {item.ShippingPostalCode}, {item.ShippingCountry}</p>
                                </div>
                              </div>

                              <div className="cmp-container__history-popup--content-item-row">
                                <div className="cmp-container__history-popup--content-item-col-12 section-billed-to">
                                  <p className="cmp-text__history-popup--content-item-label">BILLED TO</p>
                                  <p className="cmp-text__history-popup--content-item-p">{item.BillingContactName}, {item.BillingCity}, {item.BillingStreet}, {item.BillingState}, {item.BillingStateCode} {item.BillingPostalCode}, {item.BillingCountry} </p>
                                </div>
                              </div>

                              <div className="cmp-container__history-popup--content-item-row">
                                <div className="cmp-container__history-popup--content-item-col-6 payment">
                                  <p className="cmp-text__history-popup--content-item-label">PAYMENT</p>
                                  <p className="cmp-text__history-popup--content-item-p"><span className="cmp-text__bold-font">${item.OrderGrandTotal},</span> {item.PaymentMethod} </p>
                                </div>
                                <div className="cmp-container__history-popup--content-item-col-6">
                                  <p className="cmp-text__history-popup--content-item-label">PAYMENT DATE </p>
                                  <p className="cmp-text__history-popup--content-item-p">{
                                    moment(item.OrderCreatedDate).format('MMMM DD, YYYY')
                                  }</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    })
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BundleInfo
        bundlesubscriptionheading = { aemData.bundleSubscriptionHeading }
        bundlesubscriptiontitle = { aemData.bundleSubscriptionTitle }
        bundlesubscriptioninfo = { aemData.bundleSubscriptionInfo }
        bundlesubscriptionok = { aemData.bundleSubscriptionOk }
        quantityshippedstr = { quantityshippedstr }
      />
  </div>
   )
}


/*****
 * This is the logic for standingorderid as standingorderid gets wiped as soon as modal opens. So, making it global as soon as Modal is opening.
 */
var soi;
let filterArray = [];
function standingOrderId(e){
  soi = e;
}

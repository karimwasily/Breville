import React from 'react';
import { string } from 'prop-types';

import ArrowRightSVG from 'resources/svgs/arrow-right.svg';
import CallUs from 'resources/svgs/callus_P_16.svg';
import ExternalLink from 'resources/svgs/External-Link-Icon.svg';

export const Profile = ( { email } ) => {
  return (
      <div className='profile-container'>
          <h2>My Beans &gt;</h2>
          <div>
              <span>{ email }</span>
          </div>
          <span>
              <span className='profile__verify-link '>Click here</span> to verify your
              email address.
          </span>
          <span className='profile__sub-heading'>PURCHASE AND APPLIANCES</span>
          <hr />
          <span>
              <span>Orders</span>
              <ArrowRightSVG />
              <hr />
              <span>Subscriptions</span>
              <ArrowRightSVG />
          </span>
          <span className='profile__sub-heading'>ACCOUNT DETAILS</span>
          <hr />
          <span>
              <span>Personal Details</span>
              <ArrowRightSVG />
          </span>
          <span className='profile__sub-heading'>HELP AND SUPPORT</span>
          <hr />
          <span>
              Call us <a href='tel:18662738455'>18662738455</a>
              <span className='profile__callNow'>Call now</span>
              <CallUs />
          </span>
          <hr />
          <span>
              <span>Create a support ticket</span>
              <ExternalLink />
          </span>
          <hr />
          <span>
              <span>Update a support ticket</span>
              <ExternalLink />
          </span>
          <span className='profile__info'>
              We are available on phone and Live chat Monday - Friday from 8AM -
              4:30PM PT
          </span>
          <button>Log out</button>
      </div>
  );
};

Profile.propTypes = {
  email: string
};

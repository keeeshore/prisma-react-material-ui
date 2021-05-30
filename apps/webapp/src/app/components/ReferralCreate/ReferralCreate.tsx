import React from 'react';
import { ReferralUpdate } from '../ReferralUpdate';
import { ReferralModalProps } from '../ReferralUpdate/ReferralUpdate';

const ReferralCreate: React.FC<ReferralModalProps> = ({ action, handleOk, referral, children }) => {

  // A component to overwrite any props or values before rendering ReferralUpdate.

  return (
    <ReferralUpdate action={action} handleOk={handleOk} referral={referral} />
  );
};

export { ReferralCreate };

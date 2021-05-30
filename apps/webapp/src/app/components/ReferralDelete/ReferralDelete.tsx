import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React from 'react';
import { Referral } from '../../types/referral';
import { REFERRAL_ACTION } from '../ReferralContextProvider';

export interface ReferralDeleteProps {
  open: boolean;
  handleCancel: () => void;
  referral: Referral;
  action?: REFERRAL_ACTION;
  handleOk: (referral: Referral) => void;
}

const ReferralDelete: React.FC<ReferralDeleteProps> = ({ handleOk, referral, open, handleCancel, children }) => {

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle>{`Delete Referral: ${referral.email}?`}</DialogTitle>
      <DialogActions>
        <Button
          disableElevation
          size={'small'}
          onClick={handleCancel}
          variant="outlined"
          color="secondary">
          Cancel
        </Button>
        <Button
          disableElevation
          size={'small'}
          variant="contained"
          color="secondary"
          onClick={() => handleOk(referral)}
          autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ReferralDelete };

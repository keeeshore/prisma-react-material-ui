import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Referral } from '../../types/referral';
import { REFERRAL_ACTION, ReferralContext } from '../ReferralContextProvider';
import { defaultError } from '../ReferralContextProvider/ReferralContextProvider';
import style from './ReferralUpdate.module.css';

export interface ReferralModalProps {
  referral: Referral,
  action?: REFERRAL_ACTION,
  handleOk: (referral: Referral) => void;
}

const ReferralUpdate: React.FC<ReferralModalProps> = ({ action, referral, handleOk, children }) => {
  const [updatedReferral, setUpdatedReferral] = useState<Referral>({ ...referral });

  const { loading, dispatchReferral, error, setError } = useContext(ReferralContext);

  useEffect(() => {
    setUpdatedReferral(referral);
  }, [referral]);

  useEffect(() => {
    setError(defaultError);
  }, []);

  return (
    <form className={style.referralContainer} noValidate autoComplete="off">
      {error && error.code !== 0 && <h4 className={style.alert}>{error.message || JSON.stringify(error)}</h4>}
      <DialogTitle>
        {action === REFERRAL_ACTION.CREATE ?
          'Create Referral' :
          `Update Referral for ${referral.givenName}`
        }
      </DialogTitle>
      <DialogContent dividers={false}>
        <TextField
          required={true}
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          value={updatedReferral.email}
          onChange={(e: any) => {
            setUpdatedReferral((prevState: Referral) => {
              return { ...prevState, email: e.target.value };
            });
          }}
        />
        <TextField
          required={true}
          margin="dense"
          id="givenName"
          label="Given Name"
          type="text"
          fullWidth
          value={updatedReferral.givenName}
          onChange={(e: any) => {
            setUpdatedReferral((prevState: Referral) => {
              return { ...prevState, givenName: e.target.value };
            });
          }}
        />
        <TextField
          required={true}
          margin="dense"
          id="surName"
          label="Sur Name"
          type="text"
          fullWidth
          value={updatedReferral.surName}
          onChange={(e: any) => {
            setUpdatedReferral((prevState: Referral) => {
              return { ...prevState, surName: e.target.value };
            });
          }}
        />
        <TextField
          required={true}
          margin="dense"
          id="phone"
          label="Phone"
          type="phone"
          fullWidth
          value={updatedReferral.phone}
          onChange={(e: any) => {
            setUpdatedReferral((prevState: Referral) => {
              return { ...prevState, phone: e.target.value };
            });
          }}
        />
      </DialogContent>
      <Box component="div" m={1} alignItems={'center'}>
        {loading ?
          <CircularProgress disableShrink/> :
          (<DialogActions>
            <Button
              disableElevation
              size={'small'}
              onClick={() => {
                dispatchReferral(referral, REFERRAL_ACTION.NONE);
              }}
              variant="outlined">
              Cancel
            </Button>
            <Button
              type={"submit"}
              disableElevation
              size={'small'}
              onClick={() => handleOk(updatedReferral)}
              variant="contained"
              color="primary">
                {action === REFERRAL_ACTION.CREATE ? 'Create' : 'Update'}
            </Button>
          </DialogActions>)
        }
      </Box>
    </form>
  );
};

export { ReferralUpdate };

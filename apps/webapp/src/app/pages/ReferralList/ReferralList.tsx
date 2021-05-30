import React, { useContext, useEffect, useState } from 'react';
import { REFERRAL_ACTION, ReferralContext } from '../../components/ReferralContextProvider';
import { defaultReferralValues } from '../../components/ReferralContextProvider/ReferralContextProvider';
import { ReferralCreate } from '../../components/ReferralCreate';
import { ReferralDelete } from '../../components/ReferralDelete';
import { ReferralModal } from '../../components/ReferralModal';
import { ReferralTable } from '../../components/ReferralTable';
import { ReferralUpdate } from '../../components/ReferralUpdate';
import { Referral } from '../../types/referral';
import style from './ReferralList.module.css';

const ReferralList: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  const { dispatchReferral, create, list, remove, update, referralAction } = useContext(ReferralContext);

  const fetchAndSetReferrals = async () => {
    const referrals = await list();
    setReferrals(referrals);
  }

  useEffect(() => {
    const getAllReferrals = async () => {
      fetchAndSetReferrals();
    };
    getAllReferrals();
  }, []);

  useEffect(() => {
    if (referralAction.type === REFERRAL_ACTION.LIST) {
      fetchAndSetReferrals()
    }
  }, [referralAction]);

  const onHandleUpdate = async (updatedReferral: Referral) => {
    const response: any = await update(updatedReferral);
    if (!response.code && !response.message) {
      dispatchReferral(response, REFERRAL_ACTION.LIST);
    }
  };

  const onHandleDelete = async (selectedReferral: Referral) => {
    const referral = await remove(selectedReferral);
    dispatchReferral(referral, REFERRAL_ACTION.LIST);
  };

  const onHandleCreate = async (newReferral: Referral) => {
    const response: any = await create(newReferral);
    console.log('onHandleCreate ::: ', response);
    if (!response.code && !response.message) {
      dispatchReferral(response, REFERRAL_ACTION.NONE);
      setReferrals([...referrals, ...[response]]);
    }
  };

  const onHandleClose = () => {
    dispatchReferral(defaultReferralValues, REFERRAL_ACTION.NONE);
  };

  return (
    <div className={style.frame}>
      <ReferralTable referrals={referrals}/>
        {referralAction.type === REFERRAL_ACTION.DELETE &&
          <ReferralDelete
            referral={referralAction.value}
            open={true}
            handleOk={onHandleDelete}
            handleCancel={onHandleClose}
          />
        }
      {referralAction.type === REFERRAL_ACTION.UPDATE &&
        <ReferralModal open={true} handleClose={onHandleClose}>
          <ReferralUpdate
            action={REFERRAL_ACTION.UPDATE}
            referral={referralAction.value}
            handleOk={onHandleUpdate}
          />
        </ReferralModal>
      }
      {referralAction.type === REFERRAL_ACTION.CREATE &&
        <ReferralModal open={true} handleClose={onHandleClose}>
          <ReferralCreate
            action={REFERRAL_ACTION.CREATE}
            referral={referralAction.value}
            handleOk={onHandleCreate}
          />
        </ReferralModal>
      }
    </div>
  );
};

export { ReferralList };

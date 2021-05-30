import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import React, { useEffect, useState, Context, useReducer } from 'react';
import { Referral } from '../../types/referral';

export enum REFERRAL_ACTION {
  NONE,
  LIST,
  CREATE,
  DELETE,
  UPDATE,
}

interface ReferralAction {
  value: Referral;
  type: number;
  dispatchReferral?: () => void;
}

export const defaultReferralValues: Referral = {
  id: 0,
  givenName: '',
  surName: '',
  email: '',
  phone: '',
};

export const defaultError = {
  code: 0,
  message: ''
}

export const ReferralContext = React.createContext({
  loading: false,
  dispatchReferral: (referral: Referral, action: REFERRAL_ACTION) => defaultReferralValues,
  referralAction: { value: defaultReferralValues, type: REFERRAL_ACTION.NONE },
  create: async (referral: Referral) => defaultReferralValues,
  update: async (referral: Referral) => defaultReferralValues,
  remove: async (referral: Referral) => defaultReferralValues,
  list: async () => [],
  error: { code: 0, message: '' },
  setError: ({ code: number, message: string }) => null
});

const axiosConfig = { headers: { 'content-type': 'application/json' } };

const ReferralContextProvider: React.FC = ({ children }) => {

  const [referralAction, setReferralAction] = useState<ReferralAction>({
    value: {
      id: 0,
      givenName: '',
      surName: '',
      email: '',
      phone: '',
    },
    type: REFERRAL_ACTION.NONE,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(defaultError);

  const dispatchReferral = (referral: Referral, action: REFERRAL_ACTION) => {
    setReferralAction({ value: referral, type: action });
    return referral;
  };

  const list = async () => {
    let referrals = [];
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3333/referrals');
      referrals = response.data;
    } catch (error: any) {
      referrals = [];
    } finally {
      setLoading(false);
    }
    return referrals;
  };

  const create = async (referral: Referral) => {
    let data;
    const url = `http://localhost:3333/referral/create`;
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.post(url, referral, axiosConfig);
      data = response.status === 200 && response.data;
    } catch (error: any) {
      data = error?.response?.data || { code: 1000, message: 'Unknown Create Error' };
      console.log(" create setError :: ", data);
      setError(data);
    } finally {
      setLoading(false);
    }
    return data;
  };

  const remove = async (referral: Referral) => {
    let data;
    const url = `http://localhost:3333/referrals/${referral.id}`;
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.delete(url);
      data = response.status === 200 && response.data;
    } catch (error: any) {
      data = error?.response?.data || { error: { code: 1000, message: 'Unknown Remove Error' }};
      setError(data);
    } finally {
      setLoading(false);
    }
    return data;
  };

  const update = async (referral: Referral) => {
    let data;
    const url = `http://localhost:3333/referrals/${referral.id}`;
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.put(url, referral, axiosConfig);
      data = response.status === 200 && response.data;
    } catch (error: any) {
      data = error?.response?.data || { error: { code: 1000, message: 'Unknown Update Error' }};
      setError(data);
    } finally {
      setLoading(false);
    }
    return data;
  };

  return (
    <ReferralContext.Provider value={{ loading, referralAction, error, setError, list, remove, update, create, dispatchReferral }}>
      {children}
    </ReferralContext.Provider>
  );
};

export { ReferralContextProvider };

import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllReferrals = async (req: Request, res: Response) => {
  const referrals = await prisma.referral.findMany();

  res.json(referrals);
};

export const getReferralById = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  const referral = await prisma.referral.findUnique({
    where: { id: Number(id) },
  });

  res.json(referral);
};

export const deleteReferralById = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  const referral = await prisma.referral.delete({
    where: { id: Number(id) },
  });

  res.json(referral);
};

export const updateReferralById = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  const { givenName, surName, email,  phone }: {
    givenName: string,
    surName: string,
    email: string,
    phone: string,
  } = req.body;
  // TODO: Validations
  if (!givenName || !surName || !email || !phone) {
    return res.status(406).json({  code: 1040, message: 'Required Fields Empty!' });
  }
  try {
    const referral = await prisma.referral.update({
      where: { id: Number(id) },
      data: {
        surName,
        email,
        givenName,
        phone,
      },
    });
    // Mimic delay to show loading bar
    setTimeout(() => {
      res.json(referral);
    }, 1000);
  } catch (err: any) {
    res.status(406).json({  code: 1040, message: 'Unknown Error' });
  }
};

export const createReferral = async (req: Request, res: Response) => {
  const { givenName, surName, email,  phone }: {
    givenName: string,
    surName: string,
    email: string,
    phone: string,
  } = req.body;
  // TODO: Validations
  if (!givenName || !surName || !email || !phone) {
    return res.status(406).json({  code: 1040, message: 'Required Fields Empty!' });
    // return res.status(406).json({ code: 1040, message: 'Required Fields Empty!' });
  }
  const referral = await prisma.referral.create({
    data: {
      surName,
      email,
      givenName,
      phone,
    },
  });
  // res.json(referral);
  // Mimic delay of 3 sec to show loading bar
  setTimeout(() => {
    res.json(referral);
  }, 1000);
};

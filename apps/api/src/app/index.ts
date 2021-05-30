import * as cors from 'cors';
import * as express from 'express';
import { getAllReferrals, getReferralById, deleteReferralById, updateReferralById, createReferral } from './referrals/api';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/referrals', getAllReferrals);
app.get('/referrals/:id', getReferralById);
app.delete('/referrals/:id', deleteReferralById);
app.put('/referrals/:id', updateReferralById);
app.post('/referral/create', createReferral);

export default app;

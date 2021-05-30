import { Button, TableFooter } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useContext } from 'react';
import { ReactComponent as CreateIcon } from '../../../assets/create-24px.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete-24px.svg';
import { Referral } from '../../types/referral';
import { IconButton } from '../IconButton';
import { REFERRAL_ACTION, ReferralContext } from '../ReferralContextProvider';
import { defaultReferralValues } from '../ReferralContextProvider/ReferralContextProvider';
import style from './ReferralTable.module.css';


const TableHeadCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableHeadCell }}>{children}</TableCell>
);

const TableBodyCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableBodyCell }}>{children}</TableCell>
);

interface ActionBodyCellProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const ActionBodyCell: React.FC<ActionBodyCellProps> = ({
                                                         onEditClick,
                                                         onDeleteClick,
                                                       }) => (
  <TableCell classes={{ root: style.actionBodyCell }}>
    <IconButton onClick={onEditClick}>
      <CreateIcon />
    </IconButton>
    <IconButton onClick={onDeleteClick}>
      <DeleteIcon />
    </IconButton>
  </TableCell>
);

interface ReferralTableProps {
  referrals: Referral[];
}

const ReferralTable: React.FC<ReferralTableProps> = ({ referrals }) => {
  const { dispatchReferral } = useContext(ReferralContext);
  return (
    <TableContainer classes={{ root: style.container }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Given Name</TableHeadCell>
            <TableHeadCell>Surname</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow key={referral.id}>
              <TableBodyCell>{referral.givenName}</TableBodyCell>
              <TableBodyCell>{referral.surName}</TableBodyCell>
              <TableBodyCell>{referral.email}</TableBodyCell>
              <TableBodyCell>{referral.phone}</TableBodyCell>
              <ActionBodyCell
                onEditClick={() => {
                  console.log(`Edit referral ${referral.id} clicked`);
                  dispatchReferral(referral, REFERRAL_ACTION.UPDATE);
                }
                }
                onDeleteClick={() => {
                  console.log(`Delete referral ${referral.id} clicked`);
                  dispatchReferral(referral, REFERRAL_ACTION.DELETE);
                }
                }
              />
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell classes={{ root: style.tableFooterCell }} align={"right"} colSpan={5} className={"text-right"}>
              <Button variant="contained" size={"small"} color="primary" disableElevation onClick={() => {
                dispatchReferral(defaultReferralValues, REFERRAL_ACTION.CREATE);
              }}>
                Create Referral
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export { ReferralTable };

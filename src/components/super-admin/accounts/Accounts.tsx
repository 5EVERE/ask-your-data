import React from 'react';
import styles from './Accounts.module.css';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useTranslation } from 'react-i18next';

interface Account {
  name: string;   
  status: string; 
}

const Accounts: React.FC = () => {
  const { t } = useTranslation('accounts'); 
  const accounts: Account[] = [
    { name: 'NeuraWave', status: 'active' },
    { name: 'LuminoCore', status: 'active' },
    { name: 'Orisys Enterprises', status: 'inactive' },
    { name: 'BlazeHorizon', status: 'active' },
    { name: 'CrimsonPeak Ventures', status: 'inactive' },
    { name: 'Pivona Solutions', status: 'active' },
    { name: 'Triton Labs', status: 'active' },
  ];

  return (
    <div className={styles.optionContainer}>
      <div className={styles.container}>
        {/* Title */}
        <h2 className={styles.title}>{t('title')}</h2>

        {/* Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('tableHeaders.accountName')}</th>
              <th>{t('tableHeaders.status')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index}>
                {/* Account Name */}
                <td className={styles.accountName}>{account.name}</td>

                {/* Status */}
                <td className={styles.status}>
                  {t(`status.${account.status.toLowerCase()}`)}
                </td>

                {/* Edit Icon */}
                <td>
                  <HiOutlinePencilSquare className={styles.editIcon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* New Account Button */}
        <button className={styles.newAccountButton}>
          {t('newAccountButton')}
        </button>
      </div>
    </div>
  );
};

export default Accounts;

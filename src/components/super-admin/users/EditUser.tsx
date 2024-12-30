import React, { useState, useEffect } from 'react';
import styles from './EditUser.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { User } from './Users';
import { useTranslation } from 'react-i18next';

const workspaces = [
  'Lead Generation and Marketing',
  'Insurance management',
  'Contract management',
  'Policy and regulation guidance',
  'Billing and payments',
];

interface EditUserProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ onSave, onCancel, user }) => {
  const { t } = useTranslation('userEdit'); 
  const [userEdit, setUserEdit] = useState<User>(user);

  useEffect(() => {
    setUserEdit(user);
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserEdit({ ...userEdit, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(userEdit);
  };

  return (
    <div className={styles.optionContainer}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          {t('breadcrumb.accounts')} &gt; <span>{t('breadcrumb.global')}</span>{' '}
          &gt; <span>{t('breadcrumb.editUser')}</span>
        </nav>

        {/* Заголовок */}
        <h2 className={styles.title}>{t('title')}</h2>

        {/* Форма редагування користувача */}
        <form className={styles.userForm} onSubmit={handleSubmit}>
          <label className={styles.userLabel}>
            {t('form.firstName')}
            <input
              className={styles.userInput}
              type="text"
              name="firstName"
              value={userEdit.firstName}
              onChange={handleChange}
            />
          </label>

          <label className={styles.userLabel}>
            {t('form.lastName')}
            <input
              className={styles.userInput}
              type="text"
              name="lastName"
              value={userEdit.lastName}
              onChange={handleChange}
            />
          </label>

          <label className={styles.userLabel}>
            {t('form.email')}
            <input
              className={styles.userInput}
              type="email"
              name="email"
  
              onChange={handleChange}
            />
          </label>

          <label className={styles.userLabel}>
            {t('form.status')}
            <select
              className={styles.userSelect}
              name="status"
              value={userEdit.status}
              onChange={handleChange}
            >
              <option value="Active">{t('form.statusOptions.active')}</option>
              <option value="Inactive">{t('form.statusOptions.inactive')}</option>
            </select>
          </label>

          {/* Робочі області */}
          <p>{t('form.connectedWorkspaces')}</p>
          <div className={styles.workspaces}>
            {workspaces.map((workspace) => (
              <button
                type="button"
                key={workspace}
                className={styles.workspaceSelected}
              >
                {workspace}
              </button>
            ))}
          </div>

          {/* Кнопки */}
          <div className={styles.buttons}>
            <div>
              <button
                type="button"
                className={styles.backButton}
                onClick={onCancel}
              >
                {t('buttons.back')}
              </button>
              <button type="submit" className={styles.saveButton}>
                {t('buttons.save')}
              </button>
            </div>
            <button type="button" className={styles.passwordButton}>
              {t('buttons.passwordReset')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

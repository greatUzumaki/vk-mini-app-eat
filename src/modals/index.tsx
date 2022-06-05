import { ModalRoot } from '@cteamdev/router';
import React from 'react';
import { Modal as CustomModalCard } from './ModalCard';
import { Modal as CustomModalPage } from './ModalPage';

export const Modals = () => {
  return (
    <ModalRoot>
      <CustomModalCard nav='modal' />
      <CustomModalPage nav='modal-page' />
    </ModalRoot>
  );
};

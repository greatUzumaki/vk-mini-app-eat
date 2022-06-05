import {
  Icon28GlobeOutline,
  Icon28InfoOutline,
  Icon28UserOutline,
} from '@vkontakte/icons';
import React from 'react';
import { NavigationItem } from '../../types';

export const allPages: NavigationItem[] = [
  { to: '/', text: 'Карта', icon: <Icon28GlobeOutline /> },
  { to: '/info', text: 'Инфо', icon: <Icon28InfoOutline /> },
  { to: '/profile', text: 'Профиль', icon: <Icon28UserOutline /> },
];

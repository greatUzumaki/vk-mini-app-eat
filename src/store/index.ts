import { atom } from '@mntm/precoil';
import { UserInfo } from '@vkontakte/vk-bridge';
import { Result } from '../api';
import { Snackbar } from '../types';

export const vkUserAtom = atom<UserInfo>({} as UserInfo, 'vkUser');

export const snackbarAtom = atom<Snackbar | undefined>(undefined, 'snackbar');

export const markersAtom = atom<Result[]>([], 'markers');

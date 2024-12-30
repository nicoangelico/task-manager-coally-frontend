/* eslint-disable no-undef */
const API_USER = 'API_USER';
const API_TOKEN = 'API_TOKEN';

export const getApiToken = () => localStorage.getItem(API_TOKEN) || '';
export const getApiUser = () => JSON.parse(localStorage.getItem(API_USER) || '{}');

export const setApiToken = (token: string) => localStorage.setItem(API_TOKEN, token);
export const setApiUser = (data: any) => localStorage.setItem(API_USER, JSON.stringify(data));

export const deleteApiToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(API_USER);
  }
};

export const deleteApiUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(API_USER);
  }
};

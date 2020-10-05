import { get, post, putNoResponse } from './http';

const SITE = '/api/Site';
const INDUCTION = '/api/Induction';

export const getSites = () => get(`${SITE}`, '', 'Failed to load sites');
export const getInductionForSite = (id) => get(`${INDUCTION}/SITE/${id}`, '', 'Failed to load induction');
export const createInduction = (induction) => post(`${INDUCTION}`, induction, 'Failed to create induction');
export const updateInduction = (induction) => putNoResponse(`${INDUCTION}`, induction, 'Failed to update induction');

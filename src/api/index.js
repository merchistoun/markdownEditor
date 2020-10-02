import { get, post, base } from './http';

const SITES = '/api/Site';
const INDUCTION = '/api/Induction/Site/';

export const getSites = () => get(`${SITES}`, '', 'Failed to load sites');
export const getInductionForSite = (id) => get(`${INDUCTION}${id}`, '', 'Failed to load induction');

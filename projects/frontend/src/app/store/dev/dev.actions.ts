import { createAction } from '@ngrx/store';
import { Dev } from './dev.state';

export const loadDevs = createAction('[Dev] Load Devs');
export const loadDevsSuccess = createAction('[Dev] Load Devs Success', (devs: Dev[]) => ({ devs }));
export const loadDevsFailure = createAction('[Dev] Load Devs Failure', (error: string) => ({ error }));
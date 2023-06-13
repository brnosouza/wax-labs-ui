import createSetMinRequestedAction, {
  SetMinRequestedAction,
} from '@/api/chain/actions/create/setMinRequestedAction.ts';

import { execute } from './execute';

export async function setMinRequested({ minRequested, activeUser }: SetMinRequestedAction) {
  return await execute(activeUser, [createSetMinRequestedAction({ minRequested, activeUser })]);
}

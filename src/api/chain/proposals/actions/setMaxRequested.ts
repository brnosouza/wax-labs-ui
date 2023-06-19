import { execute } from '@/api/chain/actions';
import createSetMaxRequestedAction, {
  CreateSetMaxRequestedAction,
} from '@/api/chain/proposals/actions/create/createSetMaxRequestedAction.ts';

export async function setMaxRequested({ maxRequested, activeUser }: CreateSetMaxRequestedAction) {
  return await execute(activeUser, [createSetMaxRequestedAction({ maxRequested, activeUser })]);
}

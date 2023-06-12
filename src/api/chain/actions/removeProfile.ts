import createRemoveProfileAction, { RemoveProfileAction } from '@/api/chain/actions/create/removeProfileAction.ts';

import { execute } from '.';

export async function removeProfile({ waxAccount, activeUser }: RemoveProfileAction) {
  return await execute(activeUser, [createRemoveProfileAction({ waxAccount, activeUser })]);
}

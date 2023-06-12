import wax from '@/api/chain';
import { Profile } from '@/api/models/profile.ts';
import { LABS_CONTRACT_ACCOUNT, Tables } from '@/constants.ts';

export default async function fetchProfile(profile: string) {
  try {
    const { rows } = await wax.rpc.get_table_rows({
      code: LABS_CONTRACT_ACCOUNT,
      scope: LABS_CONTRACT_ACCOUNT,
      table: Tables.PROFILES,
      json: true,
      lower_bound: profile,
      upper_bound: profile,
      limit: 1,
    });

    return rows?.[0]?.profile as Profile;
  } catch (e) {
    console.error('Error while getting profile', e);
    return null;
  }
}

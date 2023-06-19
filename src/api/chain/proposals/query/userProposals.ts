import { getProposals } from '@/api/chain/proposals/query/getProposals.ts';
import { nameBounds } from '@/api/chain/proposals/query/proposalBounds.ts';
import { Proposal } from '@/api/models/proposal.ts';
import { ProposalFilterType, ProposalStatusKey } from '@/constants.ts';

export function userProposals({
  proposalStatusKey,
  accountName,
}: {
  proposalStatusKey: ProposalStatusKey;
  accountName: string;
}): Promise<Proposal[]> {
  const { upperBound, lowerBound } = nameBounds({ statusKey: proposalStatusKey, accountName });

  return getProposals({
    queryType: ProposalFilterType.BY_PROPOSER_STAT,
    lowerBound,
    upperBound,
  });
}

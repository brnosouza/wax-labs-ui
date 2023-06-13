import { getProposals } from '@/api/chain/proposals/getProposals.ts';
import { Proposal } from '@/api/models/proposal.ts';

export async function singleProposal({ proposalId }: { proposalId: string }): Promise<Proposal> {
  const proposals = await getProposals({
    lowerBound: proposalId,
    upperBound: proposalId,
  });

  return proposals?.[0];
}

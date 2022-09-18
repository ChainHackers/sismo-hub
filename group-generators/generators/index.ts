import circularmerchLensFollowers from "./circularmerch-lens-followers" ;
import ensVoters from "./ens-voters";
import eth2Depositors from "./eth2-depositors";
import ethereumDevelopers from "./ethereum-developers";
import ethereumMostTransactions from "./ethereum-most-transactions";
import ethereumPowerUsers from "./ethereum-power-users";
import EthereumPowerUsersZkBadgeHolders from "./ethereum-power-users-zk-badge-holders"
import lens50BestFollowed from "./lens-50-best-followed";
import lensProfiles from "./lens-profiles";
import localGroup from "./local-group";
import masqueradeLensFollowers from "./masquerade-lens-followers";
import MasqueradeZkBadgeHolders from "./masquerade-zk-badge-holders"
import pohZkBadgeHolders from "./poh-zk-badge-holders"
import poolyLawyerMinters from "./pooly-lawyer-minters";
import poolyMinters from "./pooly-minters";
import proofOfHatBronze from "./proof-of-hat-bronze";
import proofOfHatGold from "./proof-of-hat-gold";
import proofOfHatSilver from "./proof-of-hat-silver";
import proofOfHumanity from "./proof-of-humanity";
import proofOfLepakMember from "./proof-of-lepak-member";
import sismoAndMasqueradeLensFollowers from "./sismo-and-masquerade-lens-followers";
import sismoCitizens from "./sismo-citizens";
import sismoContributors from "./sismo-contributors";
import sismoDiggers from "./sismo-diggers";
import sismoDomain from "./sismo-domains";
import sismoEarlyUsers from "./sismo-early-users"
import sismoEvents from "./sismo-events"
import sismoGen from "./sismo-gen";
import sismoGitcoinDonors from "./sismo-gitcoin-donors";
import sismoGuest from "./sismo-guests";
import sismoLensFollowers from "./sismo-lens-followers";
import sismoMasqueradeLensFollowers from "./sismo-masquerade-lens-followers";

import { GroupGeneratorsLibrary } from "topics/group-generator";

export const groupGenerators: GroupGeneratorsLibrary = {
  "ens-voters": ensVoters,
  "eth2-depositors": eth2Depositors,
  "ethereum-developers": ethereumDevelopers,
  "ethereum-most-transactions": ethereumMostTransactions,
  "ethereum-power-users": ethereumPowerUsers,
  "ethereum-power-users-zk-badge-holders": EthereumPowerUsersZkBadgeHolders,
  "lens-profiles": lensProfiles,
  "local-group": localGroup,
  "masquerade-lens-followers": masqueradeLensFollowers,
  "masquerade-zk-badge-holders": MasqueradeZkBadgeHolders,
  "poh-zk-badge-holders": pohZkBadgeHolders,
  "pooly-lawyer-minters": poolyLawyerMinters,
  "pooly-minters": poolyMinters,
  "proof-of-hat-bronze": proofOfHatBronze,
  "proof-of-hat-gold": proofOfHatGold,
  "proof-of-hat-silver": proofOfHatSilver,
  "proof-of-humanity": proofOfHumanity,
  "sismo-and-masquerade-lens-followers": sismoAndMasqueradeLensFollowers,
  "sismo-citizens": sismoCitizens,
  "sismo-contributors": sismoContributors,
  "sismo-diggers": sismoDiggers,
  "sismo-domains": sismoDomain,
  "sismo-early-users": sismoEarlyUsers,
  "sismo-events": sismoEvents,
  "sismo-gen": sismoGen,
  "sismo-gitcoin-donors": sismoGitcoinDonors,
  "sismo-guests": sismoGuest,
  "sismo-lens-followers": sismoLensFollowers,
  "sismo-masquerade-lens-followers": sismoMasqueradeLensFollowers,
  "proof-of-lepak-member": proofOfLepakMember,
  "circularmerch-lens-followers": circularmerchLensFollowers,
  "lens-50-best-followed": lens50BestFollowed,
};

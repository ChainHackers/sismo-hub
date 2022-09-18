import { dataOperators } from "@group-generators/helpers/data-operators";
import { GroupStore, GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {

    const latestMasqueradeGroup = await groupStore.latest("masquerade-zk-badge-holders")
    const latestSismoGenGroup = await groupStore.latest("sismo-gen")
    const latestSismoEvents = await groupStore.latest("sismo-events")
    const latestPoHGroup = await groupStore.latest("poh-zk-badge-holders")
    const latestEthereumPowerUserZkBadgeGroup = await groupStore.latest("ethereum-power-users-zk-badge-holders")
    const latestSismoGitcoinDonorsGroup = await groupStore.latest("sismo-gitcoin-donors")
    const latestSismoDiggersGroup = await groupStore.latest("sismo-diggers");

    // weight attribution
    
    const masquerade = dataOperators.Map(await latestMasqueradeGroup.data(), 1)
    const sismoGen = await latestSismoGenGroup.data()
    const sismoEvents =  dataOperators.Map(await latestSismoEvents.data(), 10)
    const pohGroup = dataOperators.Map(await latestPoHGroup.data(), 10)
    const ethereumPowerUserZkBadge = dataOperators.Map(await latestEthereumPowerUserZkBadgeGroup.data(), 10)
    const sismoGitcoinDonors = dataOperators.Map(await latestSismoGitcoinDonorsGroup.data(), 10)
    const sismoDiggers = dataOperators.Map(await latestSismoDiggersGroup.data(), 100)
    
    const sismoCitizensData = dataOperators.Union(masquerade, sismoGen, sismoEvents,pohGroup, ethereumPowerUserZkBadge, sismoGitcoinDonors, sismoDiggers)

    return [
      {
        name: "sismo-citizens",
        timestamp: context.timestamp,
        data: sismoCitizensData,
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.User],
      },
    ];
  },
};

export default generator;

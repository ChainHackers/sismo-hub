import { BigNumberish } from "ethers";
import BigQueryProvider, { SupportedNetwork } from "@group-generators/helpers/providers/big-query/big-query";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const bigQueryProvider = new BigQueryProvider({network: SupportedNetwork.POLYGON});

    const donateEventABI =
      "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);";

    type DonateEventType = {
      operator: string;
      from: string;
      to: string;
      id: BigNumberish;
      value: BigNumberish
    };

    // Badges contract address on Polygon
    const contractAddress = "0xF12494e3545D49616D9dFb78E5907E9078618a34";
    const getMasqueradeZkBadgeHolders = await bigQueryProvider.getBadges<DonateEventType>({
            contractAddress: contractAddress,
            eventABI: donateEventABI,
            options: {
                zk_badge_id: "10000004",
                zk_badge_value: "1"
            }
          });

    const data: FetchedData = {};
    for (const event of getMasqueradeZkBadgeHolders) {
            data[event.to] = 1;
    }

    return [
      {
        name: "masquerade-zk-badge-holders",
        timestamp: context.timestamp,
        data: data,
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;

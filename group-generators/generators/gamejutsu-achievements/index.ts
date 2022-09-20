import { gql } from "graphql-request";
import { dataProviders } from "@group-generators/helpers/providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

function makeQuery(achievement: 'winner' | 'loser' | 'draw' | 'cheater') {
  return gql`
            query ${achievement} ($amount: Int) {
              inRowCounterEntities(where: {${achievement}MaxValue_gte: $amount}) {
                id
              }
            }`;
}

function makeAmount(grade: 'bronze' | 'silver' | 'gold') : number | undefined {
  if (grade == 'bronze') {
    return 1;
  } else
  if (grade == 'silver') {
    return 5;
  } else
  if (grade == 'gold') {
    return 10;
  }
}

function getGenerator(achievement: 'winner' | 'loser' | 'draw' | 'cheater', grade: 'bronze' | 'silver' | 'gold') {
  const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Daily,

    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
      // This group is constituted by all the users who have a sismo.eth domain
      const subgraphHostedServiceProvider =
        new dataProviders.SubgraphHostedServiceProvider({
          url: "https://api.thegraph.com/subgraphs/name/chainhackers/gamejutsu-subgraph",
        });

      type Player = { id: string };
      const players = await subgraphHostedServiceProvider.query<{
        inRowCounterEntities: Player[];
      }>(
        makeQuery(achievement),
        { amount: makeAmount(grade) }
      );

      const fetchedData: { [address: string]: number } = {};

      for (const player of players.inRowCounterEntities.map((p) => p.id)) {
        fetchedData[player] = 1;
      }

      return [
        {
          name: `gamejutsu-${grade}-${achievement}`,
          timestamp: context.timestamp,
          data: fetchedData,
          valueType: ValueType.Score,
          tags: [Tags.GameJutsu, Tags.User],
        },
      ];
    },
  };
  return generator;
}

export const gamejustuBronzeWinner = getGenerator('winner', 'bronze');
export const gamejustuSilverWinner = getGenerator('winner', 'silver');
export const gamejustuGoldWinner = getGenerator('winner', 'gold');
export const gamejustuBronzeLoser = getGenerator('loser', 'bronze');
export const gamejustuSilverLoser = getGenerator('loser', 'silver');
export const gamejustuGoldLoser = getGenerator('loser', 'gold');
export const gamejustuBronzeDraw = getGenerator('draw', 'bronze');
export const gamejustuSilverDraw = getGenerator('draw', 'silver');
export const gamejustuGoldDraw = getGenerator('draw', 'gold');
export const gamejustuBronzeCheater = getGenerator('cheater', 'bronze');
export const gamejustuSilverCheater = getGenerator('cheater', 'silver');
export const gamejustuGoldCheater = getGenerator('cheater', 'gold');

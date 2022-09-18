import { gql } from "graphql-request";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/providers";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const subgraphHostedServiceProvider =
      new dataProviders.SubgraphHostedServiceProvider({
        url: "https://api.thegraph.com/subgraphs/name/sismo-core/sismo-dao",
      });

    type GenXHolder = { id: string, generation: string } ;
    type GenOneHolder = { id: string, generation: string } ;
    type GenZeroHolder = { id: string, generation: string } ;

    const sismoGenXHolders = await subgraphHostedServiceProvider.query<{
      zikis: GenXHolder[];
    }>(
      gql`
      query getAllGenXHolders {
        zikis(first: 1000, where: {generation: X}) {
          id
          generation
        }
      }
      `
    );

    const sismoGenOneHolders = await subgraphHostedServiceProvider.query<{
        zikis: GenOneHolder[];
      }>(
        gql`
        query getAllGenOneHolders {
          zikis(first: 1000, where: {generation: ONE}) {
            id
            generation
          }
        }
        `
      );

    const sismoGenZeroHolders = await subgraphHostedServiceProvider.query<{
      zikis: GenZeroHolder[];
    }>(
      gql`
      query getAllGenZeroHolders {
        zikis(first: 1000, where: {generation: ZERO}) {
          id
          generation
        }
      }
      `
    );

    const dataOne: FetchedData = {};
    const dataZero: FetchedData = {};
    const dataX: FetchedData = {};

    for (const ziki of sismoGenZeroHolders.zikis.map((d) => d.id)) {
        dataZero[ziki] = 1;
      }

    for (const ziki of sismoGenXHolders.zikis.map((d) => d.id)) {
      dataX[ziki] = 10;
    }

    for (const ziki of sismoGenOneHolders.zikis.map((d) => d.id)) {
      dataOne[ziki] = 10;
    }

    const data = dataOperators.Union(dataOne, dataX, dataZero)

    return [
      {
        name: "sismo-gen",
        timestamp: context.timestamp,
        data: data,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet, Tags.ENS, Tags.User],
      },
    ];
  },
};

export default generator;

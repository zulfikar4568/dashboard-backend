import { Injectable } from '@nestjs/common';
import { ICounterFTResult, ICounterResult } from './dto/counter.dto';
import { CounterRequestDto } from './dto/counter.request';
import PrismaService from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly db: PrismaService) {}

  async queryCounter({ resourceGroup, mfgOrder, fromDate, toDate }: CounterRequestDto) {
    let resultMerged: any[];

    const result = await this.db.$queryRaw<ICounterResult[]>`
    SELECT 
      * 
    FROM OLTPSCHEMA.wikResourceGroupCounter(${resourceGroup}, ${mfgOrder}, ${fromDate}, ${toDate})
    ORDER BY
      ResourceGroupEntriesSequence`;

    await this.db.$queryRaw<ICounterFTResult[]>`
    SELECT 
      *
    FROM OLTPSCHEMA.wikCounterResourceFT(${resourceGroup}, ${mfgOrder}, ${fromDate},${toDate})`
    .then((resultFT) => {
      resultMerged = result.map((x) => ({
        name: x.Resource,
        value: x.Resource.includes('FCT1') || x.Resource.includes('FCT2') || x.Resource.includes('FCT3') ? this.logicFT(x.Resource, resultFT[0]) : x.CounterResourceMovePassFail === 0
        ? x.CounterResourceMove
        : x.CounterResourceMovePassFail,
      }));
    })

    return resultMerged;
  }

  private logicFT(nameResourceFt: string, counterFt: ICounterFTResult): number {
    if (nameResourceFt.includes('FCT1')) {
      return counterFt.FCT1;
    } else if (nameResourceFt.includes('FCT2')) {
      return counterFt.FCT2;
    } else {
      return counterFt.FCT3;
    }
  }
}

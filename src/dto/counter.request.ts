import { IsOptional, IsString } from "class-validator";

export class CounterRequestDto {
  @IsString()
  @IsOptional()
  resourceGroup: string;

  @IsString()
  @IsOptional()
  mfgOrder: string;

  @IsOptional()
  @IsString()
  fromDate: string;

  @IsOptional()
  @IsString()
  toDate: string
}
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class DefaultQuery {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @Max(50)
  @Min(1)
  @IsInt()
  @IsOptional()
  readonly page_size?: number = 20;

  @IsOptional()
  readonly search?: string;

  get skip() {
    return (this.page - 1) * this.page_size;
  }
}

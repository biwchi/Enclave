import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Ordering } from '../constant/Ordering';

export class DefaultQuery {
  @IsEnum(Ordering)
  @IsOptional()
  readonly ordering?: Ordering = Ordering.ASC;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Max(50)
  @Min(1)
  @IsInt()
  @IsOptional()
  readonly page_size?: number = 10;

  @IsOptional()
  readonly search?: string;

  get skip() {
    return (this.page - 1) * this.page_size;
  }
}

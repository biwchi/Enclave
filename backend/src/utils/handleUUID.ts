import { BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

export const handleUUID = (uuid: string) => {
  if (!isUUID(uuid)) throw new BadRequestException('ID is not valid');
};

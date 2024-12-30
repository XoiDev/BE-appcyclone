import { PartialType } from '@nestjs/swagger';
import { CreateLineOrderDto } from './create-line-order.dto';

export class UpdateLineOrderDto extends PartialType(CreateLineOrderDto) {}

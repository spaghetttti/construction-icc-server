import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './requests.entity';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [TypeOrmModule.forFeature([Request]), InventoryModule],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService, TypeOrmModule],
})
export class RequestsModule {}

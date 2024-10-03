import { forwardRef, Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { RequestsModule } from 'src/requests/requests.module';
// import { RequestsModule } from 'src/requests/requests.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    UsersModule,
    forwardRef(() => RequestsModule),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService, TypeOrmModule],
})
export class ProjectsModule {}

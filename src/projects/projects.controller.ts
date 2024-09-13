import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() project: Partial<Project>): Promise<Project> {
    return this.projectsService.create(project);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() project: Partial<Project>,
  ): Promise<Project> {
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.projectsService.delete(id);
  }
}

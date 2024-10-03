import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Request } from './requests.entity';
import { Material } from 'src/materials/material.entity';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { Project } from 'src/projects/project.entity';
@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,

    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,

    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Request[]> {
    return this.requestsRepository.find({
      relations: ['project', 'materials'],
    });
  }

  async findOne(id: number): Promise<Request> {
    return this.requestsRepository.findOne({
      where: { id: id },
      relations: ['project', 'materials'],
    });
  }

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const { projectId, materialIds, ...rest } = createRequestDto;

    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error(`Project with ID ${projectId} not found.`);
    }

    const materials = await this.materialsRepository.findBy({
      id: In(materialIds),
    });

    const newRequest = this.requestsRepository.create({
      ...rest,
      project,
      materials,
    });

    return this.requestsRepository.save(newRequest);
  }

  async update(
    id: number,
    updateRequestDto: UpdateRequestDto,
  ): Promise<Request> {
    const { projectId, materialIds, ...rest } = updateRequestDto;

    const request = await this.requestsRepository.findOne({
      where: { id },
      relations: ['project', 'materials'],
    });

    if (!request) {
      throw new Error(`Request with ID ${id} not found.`);
    }

    // Update project if provided
    if (projectId) {
      const project = await this.projectsRepository.findOne({
        where: { id: projectId },
      });
      if (!project) {
        throw new Error(`Project with ID ${projectId} not found.`);
      }
      request.project = project;
    }

    // Update materials if provided
    if (materialIds) {
      const materials = await this.materialsRepository.findBy({
        id: In(materialIds),
      });
      request.materials = materials;
    }

    Object.assign(request, rest);

    return this.requestsRepository.save(request);
  }

  async delete(id: number): Promise<void> {
    await this.requestsRepository.delete(id);
  }
}

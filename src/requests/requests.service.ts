import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './requests.entity';
import { Material } from 'src/materials/material.entity';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { Project } from 'src/projects/project.entity';
import { RequestMaterial } from './request-material.entity';
@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,

    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,

    @InjectRepository(RequestMaterial)
    private readonly requestMaterialsRepository: Repository<RequestMaterial>,

    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Request[]> {
    return this.requestsRepository.find({
      relations: ['project', 'requestMaterials', 'requestMaterials.material'],
    });
  }

  async findOne(id: number): Promise<Request> {
    return this.requestsRepository.findOne({
      where: { id: id },
      relations: ['project', 'requestMaterials', 'requestMaterials.material'],
    });
  }

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const { projectId, materials, ...rest } = createRequestDto;

    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new BadRequestException(`Project with ID ${projectId} not found`);
    }

    const request = this.requestsRepository.create({
      project,
      ...rest,
    });

    await this.requestsRepository.save(request);

    for (const materialDto of materials) {
      const { materialId, quantity } = materialDto;

      const material = await this.materialsRepository.findOne({
        where: { id: materialId },
      });

      if (!material) {
        throw new BadRequestException(
          `Material with ID ${materialId} not found`,
        );
      }

      const requestMaterial = this.requestMaterialsRepository.create({
        request,
        material,
        quantity,
      });

      await this.requestMaterialsRepository.save(requestMaterial);
    }

    return this.requestsRepository.findOne({
      where: { id: request.id },
      relations: ['requestMaterials', 'requestMaterials.material'],
    });
  }

  async update(
    id: number,
    updateRequestDto: UpdateRequestDto,
  ): Promise<Request> {
    const { projectId, materials, ...rest } = updateRequestDto;

    const request = await this.requestsRepository.findOne({
      where: { id },
      relations: ['project', 'requestMaterials', 'requestMaterials.material'],
    });

    if (!request) {
      throw new Error(`Request with ID ${id} not found.`);
    }

    if (projectId) {
      const project = await this.projectsRepository.findOne({
        where: { id: projectId },
      });
      if (!project) {
        throw new Error(`Project with ID ${projectId} not found.`);
      }
      request.project = project;
    }

    Object.assign(request, rest);

    await this.requestsRepository.save(request);

    if (materials) {
      for (const requestMaterial of request.requestMaterials) {
        await this.requestMaterialsRepository.remove(requestMaterial);
      }

      for (const materialDto of materials) {
        const { materialId, quantity } = materialDto;

        const material = await this.materialsRepository.findOne({
          where: { id: materialId },
        });

        if (!material) {
          throw new BadRequestException(
            `Material with ID ${materialId} not found`,
          );
        }

        const requestMaterial = this.requestMaterialsRepository.create({
          request,
          material,
          quantity,
        });

        await this.requestMaterialsRepository.save(requestMaterial);
      }
    }

    return this.requestsRepository.findOne({
      where: { id: request.id },
      relations: ['requestMaterials', 'requestMaterials.material'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.requestsRepository.delete(id);
  }
}

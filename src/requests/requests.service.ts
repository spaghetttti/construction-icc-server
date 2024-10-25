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

    // Create a new request
    const request = this.requestsRepository.create({
      project,
      ...rest,
    });

    await this.requestsRepository.save(request);

    // Process each material and create RequestMaterial records
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

      if (material.quantity < quantity) {
        throw new BadRequestException(
          `Not enough stock for material with ID ${materialId}`,
        );
      }

      // Reduce the material quantity in inventory
      material.quantity -= quantity;
      await this.materialsRepository.save(material);

      // Create a RequestMaterial entity
      const requestMaterial = this.requestMaterialsRepository.create({
        request,
        material,
        quantity,
      });

      await this.requestMaterialsRepository.save(requestMaterial);
    }

    // Return the full request with materials and quantities
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

    // Fetch the request along with related project and request materials
    const request = await this.requestsRepository.findOne({
      where: { id },
      relations: ['project', 'requestMaterials', 'requestMaterials.material'],
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

    // Apply other updates to the request before saving it
    Object.assign(request, rest);

    // Save the updated request first to ensure it has an ID
    await this.requestsRepository.save(request);

    // Handle materials and quantities update
    if (materials) {
      // Step 1: Restore previous material quantities to inventory
      for (const requestMaterial of request.requestMaterials) {
        const { material, quantity } = requestMaterial;

        material.quantity += quantity; // Restore quantity back to the inventory
        await this.materialsRepository.save(material);

        // Remove the existing RequestMaterial entry
        await this.requestMaterialsRepository.remove(requestMaterial);
      }

      // Step 2: Process the new materials from the updateRequestDto
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

        if (material.quantity < quantity) {
          throw new BadRequestException(
            `Not enough stock for material with ID ${materialId}`,
          );
        }

        // Reduce the material quantity in inventory
        material.quantity -= quantity;
        await this.materialsRepository.save(material);

        // Create new RequestMaterial entry
        const requestMaterial = this.requestMaterialsRepository.create({
          request, // Associate the request that is now fully saved and has an ID
          material,
          quantity,
        });

        await this.requestMaterialsRepository.save(requestMaterial);
      }
    }

    // Return the updated request with materials
    return this.requestsRepository.findOne({
      where: { id: request.id },
      relations: ['requestMaterials', 'requestMaterials.material'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.requestsRepository.delete(id);
  }
}

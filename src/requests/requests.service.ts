import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Request } from './requests.entity';
import { Material } from 'src/materials/material.entity';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,

    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
  ) {}

  async findAll(): Promise<Request[]> {
    return this.requestsRepository.find({
      relations: ['project', 'materials'],
    });
  }
  //! update from orm docs
  //   userRepository.find({
  //     relations: {
  //         project: true,
  //     },
  //     where: {
  //         project: {
  //             name: "TypeORM",
  //             initials: "TORM",
  //         },
  //     },
  // })
  async findOne(id: number): Promise<Request> {
    return this.requestsRepository.findOne({
      where: { id: id },
      relations: ['project', 'materials'],
    });
  }

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const { projectId, materials, status, teamSize } = createRequestDto;

    // Fetch Material entities from IDs
    const materialEntities = await this.materialsRepository.findBy({
      id: In(materials), //? not sure if In(array of material ids )
    });

    const newRequest = this.requestsRepository.create({
      project: { id: projectId } as any, // Assign project by ID
      materials: materialEntities, // Assign the fetched materials
      status,
      teamSize,
    });

    return this.requestsRepository.save(newRequest);
  }

  async update(
    id: number,
    updateRequestDto: UpdateRequestDto,
  ): Promise<Request> {
    const request = await this.requestsRepository.findOne({
      where: { id: id },
      relations: ['materials'],
    });

    // Check and update fields
    if (updateRequestDto.projectId) {
      request.project = { id: updateRequestDto.projectId } as any; // Handle project update
    }
    if (updateRequestDto.materials) {
      const materialEntities = await this.materialsRepository.findBy(
        //?might be a problem with finby
        updateRequestDto.materials,
      );
      request.materials = materialEntities; // Handle materials update
    }
    if (updateRequestDto.status) {
      request.status = updateRequestDto.status; // Handle status update
    }
    if (updateRequestDto.teamSize) {
      request.teamSize = updateRequestDto.teamSize; // Handle team size update
    }

    return this.requestsRepository.save(request); // Save the entity with updated relations
  }

  async delete(id: number): Promise<void> {
    await this.requestsRepository.delete(id);
  }
}

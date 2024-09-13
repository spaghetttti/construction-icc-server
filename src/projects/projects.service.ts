import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../users/user.entity'; // Import User entity

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,

    @InjectRepository(User)
    private usersRepository: Repository<User>, // Inject User repository not best solution ?
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({ relations: ['assignedForeman'] });
  }

  async findOne(id: number): Promise<Project> {
    return this.projectsRepository.findOne({
      where: { id },
      relations: ['assignedForeman'], // Fetch assignedForeman relation
    });
  }

  // Create a new project with assigned foreman
  async create(
    projectData: Partial<Project>,
    foremanId?: number,
  ): Promise<Project> {
    const newProject = this.projectsRepository.create(projectData);

    if (foremanId) {
      const foreman = await this.usersRepository.findOneBy({ id: foremanId });
      if (foreman) {
        newProject.assignedForeman = foreman; // Assign the User entity as foreman
      }
    }

    return this.projectsRepository.save(newProject);
  }

  // Update a project and handle assigned foreman
  async update(
    id: number,
    projectData: Partial<Project>,
    foremanId?: number,
  ): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['assignedForeman'],
    });

    if (!project) {
      throw new Error(`Project with ID ${id} not found.`);
    }

    Object.assign(project, projectData); // Update basic project data

    if (foremanId) {
      const foreman = await this.usersRepository.findOneBy({ id: foremanId });
      if (foreman) {
        project.assignedForeman = foreman; // Update the foreman
      } else {
        throw new Error(`Foreman with ID ${foremanId} not found.`);
      }
    }

    return this.projectsRepository.save(project); // Save updated project with foreman
  }

  async delete(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}

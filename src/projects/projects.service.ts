import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../users/user.entity'; // Import User entity
import { Request } from 'src/requests/requests.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,

    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,

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
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const {
      name,
      description,
      status,
      assignedForeman = null,
    } = createProjectDto;

    const newProject = this.projectsRepository.create({
      name,
      description,
      status,
    });

    if (assignedForeman) {
      const foreman = await this.usersRepository.findOneBy({
        id: assignedForeman,
      });
      newProject.assignedForeman = foreman || null; // Assign foreman if found, or set to null
    }

    return this.projectsRepository.save(newProject);
  }

  // Update a project and handle assigned foreman
  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['assignedForeman'],
    });

    if (!project) {
      throw new Error(`Project with ID ${id} not found.`);
    }
    const foremanId = updateProjectDto.assignedForeman;

    if (foremanId && foremanId != -1) {
      const foreman = await this.usersRepository.findOneBy({ id: foremanId });
      if (foreman) {
        project.assignedForeman = foreman; // Update the foreman
      } else {
        throw new Error(`Foreman with ID ${foremanId} not found.`);
      }
    } else {
      project.assignedForeman = null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { assignedForeman, ...otherUpdates } = updateProjectDto;
    Object.assign(project, otherUpdates);

    return this.projectsRepository.save(project); // Save updated project with foreman
  }

  async delete(id: number): Promise<void> {
    const project = await this.projectsRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Use QueryBuilder to count requests associated with the project
    const requestCount = await this.requestsRepository
      .createQueryBuilder('request')
      .where('request.projectId = :projectId', { projectId: id })
      .getCount();

    if (requestCount > 0) {
      throw new BadRequestException(
        'Cannot delete project with associated requests. Please delete or reassign requests first.',
      );
    }

    await this.projectsRepository.delete(id);
  }
}

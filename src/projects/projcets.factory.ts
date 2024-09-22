import { setSeederFactory } from 'typeorm-extension';
import { Project } from './project.entity';
import { faker } from '@faker-js/faker';

export const ProjectsFactory = setSeederFactory(Project, () => {
  const project = new Project();
  project.name = faker.commerce.productName();
  project.description = faker.lorem.sentence();
  project.status = faker.helpers.arrayElement([
    'not started',
    'in progress',
    'completed',
  ]);
  return project;
});

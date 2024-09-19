import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { Material } from './materials/material.entity';
// import { Supplier } from './suppliers/supplier.entity';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // Create users
    const usersFactory = factoryManager.get(User);
    const users = await usersFactory.saveMany(6); // Create 4 distinct users
    console.log(users);
    const [, foreman] = users; // Assign specific roles from generated users

    // // Create suppliers
    // const suppliersFactory = factoryManager.get(Supplier);
    // const suppliers = await suppliersFactory.saveMany(2); // Create 2 distinct suppliers
    // const suppliersRepository = dataSource.getRepository(Supplier);
    // await suppliersRepository.save(suppliers);

    // Create materials and assign to suppliers
    const materialsFactory = factoryManager.get(Material);
    // const materials = await Promise.all(
    //   suppliers.map((supplier) =>
    //     materialsFactory.save({
    //       supplier,
    //     }),
    //   ),
    // );
    const materials = await materialsFactory.saveMany(5);
    const materialRepository = dataSource.getRepository(Material);
    await materialRepository.save(materials);

    // Create projects and assign to foreman
    const projectsFactory = factoryManager.get(Project);
    const projects = await projectsFactory.saveMany(3, {
      assignedForeman: foreman, // Assign foreman to each project
    });

    const projectsRepository = dataSource.getRepository(Project);
    await projectsRepository.save(projects);

    console.log('Seeding completed successfully.');
  }
}

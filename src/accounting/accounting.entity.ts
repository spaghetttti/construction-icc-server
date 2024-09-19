import { Report } from 'src/reports/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Accounting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { default: 0 })
  balance: number; // Bank balance

  @OneToMany(() => Report, (report) => report.accounting, { cascade: true })
  reports: Report[]; // List of reports associated with the accounting
}

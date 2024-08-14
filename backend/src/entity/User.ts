import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";


@Entity("Users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: any;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  date_of_birth: string;

  @Column({ nullable: false })
  mobile: string;


  @Column({ nullable: true })
  forgot_password_code: string;

  @Column({ nullable: true })
  mobile_login_otp: string;

  @Column({ nullable: true })
  verify_email_code: string;

  @Column("jsonb", { nullable: false, default: [] })
  web_token: string;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn({
    type: "timestamp",
  })
  created_on: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  modified_on: Date;


  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "created_by" })
  created_by: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "modified_by" })
  modified_by: User;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export default class Todo {
  /**
   * Unique UUID for this TODO item.
   */
  @ObjectIdColumn()
  public readonly id: ObjectID;

  /**
   * Body content of this TODO item.
   */
  @Column()
  public body: string;

  /**
   * Whether or not this TODO has been marked as complete.
   */
  @Column()
  public isComplete: boolean;

  /**
   * Date in which this TODO item was created.
   */
  @CreateDateColumn()
  public readonly createdAt: Date;

  /**
   * Date in which this TODO item was last updated.
   */
  @UpdateDateColumn()
  public readonly updatedAt: Date;

  constructor(body: string) {
    this.body = body;
    this.isComplete = false;
  }
}

import {
  Table,
  Column,
  Model,
  DataType,
  Scopes,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table
@Scopes(() => ({
  // Define your scopes if needed
}))
export class Wallet extends Model<Wallet> {
  @Column(DataType.STRING)
  accountNumber: string;

  @Column(DataType.FLOAT)
  balance: number;

  @Column(DataType.FLOAT)
  escrowBalance: number;

  @Column(DataType.FLOAT)
  ledgerBalance: number;

  @Column(DataType.STRING)
  uid: string;

  // @ForeignKey(() => User)
  // @Column(DataType.STRING)
  // userId: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, {
    targetKey: 'uid',
    foreignKey: 'userId',
  })
  user: User;
}

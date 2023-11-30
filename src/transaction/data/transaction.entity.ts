import {
  Table,
  Column,
  Model,
  DataType,
  Scopes,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/data/user.entity';

@Table
@Scopes(() => ({
  // Define your scopes if needed
}))
export class Transaction extends Model<Transaction> {
  @Column(DataType.STRING)
  transactionReference: string;

  @Column(DataType.DECIMAL)
  amount: number;

  @Column(DataType.STRING)
  narration: string;

  @Column(DataType.STRING)
  currency: string;

  @Column(DataType.ENUM('PENDING', 'SUCCESSFUL', 'FAILED'))
  status: string;

  @Column(DataType.ENUM('CREDIT', 'DEBIT'))
  type: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column(DataType.DECIMAL)
  balanceBefore: number;

  @Column(DataType.DECIMAL)
  balanceAfter: number;

  @BelongsTo(() => User, {
    targetKey: 'uid',
    foreignKey: 'userId',
  })
  user: User;
}

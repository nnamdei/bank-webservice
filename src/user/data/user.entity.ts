import {
  Table,
  Column,
  Model,
  DataType,
  Scopes,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Transaction } from 'src/transaction/data/transaction.entity';
import { Wallet } from './wallet.entity';

@Table
@Scopes(() => ({
  // Define your scopes if needed
}))
export class User extends Model<User> {
  @HasMany(() => Transaction, {
    foreignKey: 'userId',
    sourceKey: 'uid',
    onDelete: 'CASCADE',
    hooks: true,
  })
  transactions: Transaction[];

  // @HasOne(() => Wallet, {
  //   foreignKey: 'userId',
  //   sourceKey: 'uid',
  //   onDelete: 'CASCADE',
  //   hooks: true,
  // })
  @HasOne(() => Wallet)
  wallet: Wallet;
  // wallet: Wallet;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.STRING)
  transactionPin: string;

  @Column(DataType.BOOLEAN)
  isPinSet: boolean;

  @Column(DataType.STRING)
  verifyToken: string;

  @Column(DataType.BOOLEAN)
  emailVerified: boolean;

  @Column(DataType.ENUM('ACTIVE', 'INACTIVE'))
  status: string;

  @Column(DataType.DATE)
  lastlogin: Date;

  @Column(DataType.STRING)
  uid: string;

  @Column(DataType.DATE)
  tokenExpiration: Date;

  toJSON(): any {
    const values = Object.assign({}, this.get());

    // Exclude specific properties
    delete values.password;
    delete values.transactionPin;
    return values;
  }
}

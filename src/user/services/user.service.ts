import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../data/user.entity';
import { Wallet } from '../data/wallet.entity';
import * as argon from 'argon2';
import { createTransferDTO, fundAccountDTO } from '../dto/transfer.dto';
import { UserRepository } from '../data/user.repository';
import { TransactionRepository } from 'src/transaction/data/transaction.repository';
import { TransactionStatus } from '../enum/transaction-status.enum';
import { TransactionType } from '../enum/transaction-type.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async getUserProfile(user) {
    if (!user.userId) {
      throw new BadRequestException('Invalid token');
    }

    // console.log(user.userId);
    const profile = await this.fetchUserDetails(user.userId);
    return { success: true, message: 'Profile fetched', data: profile };
  }

  async transferFund(user, transferDto: createTransferDTO) {
    if (!user.userId) {
      throw new BadRequestException('Invalid token');
    }
    console.log(user.userId);
    const profile = await this.fetchUserDetails(user.userId);

    const senderSearch = await this.userRepository.findWalletByUser(
      user.userId,
    );

    const receiverSearch = await this.userRepository.findWalletByNumber(
      transferDto.accountNumber,
    );

    if (senderSearch.balance < transferDto.amount) {
      throw new BadRequestException('Insufficient balance');
    } else {
      // console.log(profile);
      if (profile.isPinSet === false) {
        throw new BadRequestException('Set transaction pin to proceed');
      }
      // console.log(transferDto.transactionPin.toString());
      const isMatch: boolean = await argon.verify(
        profile.transactionPin,
        transferDto.transactionPin.toString(),
      );

      if (!isMatch) {
        throw new BadRequestException('Check your transaction pin');
      }

      const newBalance = senderSearch.balance - transferDto.amount;
      const newReceiverBal = receiverSearch.balance + transferDto.amount;
      const token = uuidv4().replace(/[- ]/g, '');
      const receivertoken = uuidv4().replace(/[- ]/g, '');
      await senderSearch.update({ balance: newBalance });

      await this.transactionRepository.create({
        transactionReference: token,
        amount: transferDto.amount,
        narration: 'Fund transfer',
        currency: 'NGN',
        status: TransactionStatus.SUCCESSFUL,
        type: TransactionType.DEBIT,
        userId: profile.id,
        balanceBefore: senderSearch.balance,
        balanceAfter: newBalance,
      });

      await receiverSearch.update({ balance: newReceiverBal });

      const receiverId = await this.fetchUserDetails(receiverSearch.uid);
      await this.transactionRepository.create({
        transactionReference: receivertoken,
        amount: transferDto.amount,
        narration: `Fund transfer to ${transferDto.accountNumber}`,
        currency: 'NGN',
        status: TransactionStatus.SUCCESSFUL,
        type: TransactionType.CREDIT,
        userId: receiverId.id,
        balanceBefore: receiverSearch.balance,
        balanceAfter: newReceiverBal,
      });
    }

    return { success: true, message: 'Transfer complete' };
  }

  async fundWallet(user, transferDto: fundAccountDTO) {
    if (!user.userId) {
      throw new BadRequestException('Invalid token');
    }

    const profile = await this.fetchUserDetails(user.userId);

    const accountSearch = await this.userRepository.findWalletByUser(
      user.userId,
    );

    const receiverSearch = await this.userRepository.findWalletByNumber(
      transferDto.accountNumber,
    );

    const newBalance = accountSearch.balance + transferDto.amount;
    // console.log('new balance', newBalance);
    // console.log('balance', accountSearch.balance);
    // console.log('amount', transferDto.amount);
    await receiverSearch.update({ balance: newBalance });

    const token = uuidv4().replace(/[- ]/g, '');

    await this.transactionRepository.create({
      transactionReference: token,
      amount: transferDto.amount,
      narration: 'Wallet top up',
      currency: 'NGN',
      status: TransactionStatus.SUCCESSFUL,
      type: TransactionType.CREDIT,
      userId: profile.id,
      balanceBefore: accountSearch.balance,
      balanceAfter: newBalance,
    });

    return {
      success: true,
      message: 'Wallet top up complete',
      data: {
        balance: receiverSearch.balance,
      },
    };
  }

  private async fetchUserDetails(userId: string): Promise<User | null> {
    return User.findOne({
      where: { uid: userId },
      include: [
        {
          model: Wallet,
          attributes: ['balance', 'ledgerBalance', 'accountNumber'],
        },
      ],
    });
  }
}

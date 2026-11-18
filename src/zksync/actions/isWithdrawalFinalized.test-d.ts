import type {
  GetTransactionReceiptErrorType,
  ReadContractErrorType,
} from 'viem/actions'
import type { IsAddressEqualErrorType } from 'viem/utils'
import type { IsWithdrawalFinalizedErrorType } from 'viem/zksync'
import { expectTypeOf, test } from 'vitest'

test('includes receipt and contract errors', () => {
  const receiptError: IsWithdrawalFinalizedErrorType =
    {} as GetTransactionReceiptErrorType
  const contractError: IsWithdrawalFinalizedErrorType =
    {} as ReadContractErrorType

  expectTypeOf(receiptError).toExtend<IsWithdrawalFinalizedErrorType>()
  expectTypeOf(contractError).toExtend<IsWithdrawalFinalizedErrorType>()
})

test('retains receipt and contract error discriminants', () => {
  const error = {} as IsWithdrawalFinalizedErrorType

  if (error.name === 'TransactionReceiptNotFoundError')
    expectTypeOf(error.name).toEqualTypeOf<'TransactionReceiptNotFoundError'>()

  if (error.name === 'ContractFunctionExecutionError') {
    expectTypeOf(error.functionName).toEqualTypeOf<string>()
    expectTypeOf(error.contractAddress).toEqualTypeOf<
      `0x${string}` | undefined
    >()
  }
})

test('includes withdrawal log address errors', () => {
  expectTypeOf<IsAddressEqualErrorType>().toExtend<IsWithdrawalFinalizedErrorType>()

  const error = {} as IsWithdrawalFinalizedErrorType
  if (error.name !== 'InvalidAddressError') return

  expectTypeOf(error.name).toEqualTypeOf<'InvalidAddressError'>()
})

import {
  FundsDeposited as FundsDepositedEvent,
  FundsWithdrawn as FundsWithdrawnEvent,
  HospitalRegistered as HospitalRegisteredEvent,
  PaymentSent as PaymentSentEvent,
  WasteRecorded as WasteRecordedEvent,
  WasteValidated as WasteValidatedEvent
} from "../generated/WasteInsured/WasteInsured"
import {
  FundsDeposited,
  FundsWithdrawn,
  HospitalRegistered,
  PaymentSent,
  WasteRecorded,
  WasteValidated
} from "../generated/schema"

export function handleFundsDeposited(event: FundsDepositedEvent): void {
  let entity = new FundsDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.wasteAdmin = event.params.wasteAdmin
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundsWithdrawn(event: FundsWithdrawnEvent): void {
  let entity = new FundsWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.wasteAdmin = event.params.wasteAdmin
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleHospitalRegistered(event: HospitalRegisteredEvent): void {
  let entity = new HospitalRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.hospitalId = event.params.hospitalId
  entity.name = event.params.name
  entity.location = event.params.location
  entity.hospitalType = event.params.hospitalType
  entity.walletAddress = event.params.walletAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaymentSent(event: PaymentSentEvent): void {
  let entity = new PaymentSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWasteRecorded(event: WasteRecordedEvent): void {
  let entity = new WasteRecorded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.wasteId = event.params.wasteId
  entity.producer = event.params.producer
  entity.depositor = event.params.depositor
  entity.wasteType = event.params.wasteType
  entity.collectionLocation = event.params.collectionLocation
  entity.weight = event.params.weight
  entity.wasteAmount = event.params.wasteAmount
  entity.hospitalAddress = event.params.hospitalAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWasteValidated(event: WasteValidatedEvent): void {
  let entity = new WasteValidated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.wasteId = event.params.wasteId
  entity.wasteAdmin = event.params.wasteAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

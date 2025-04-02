export abstract class EventBridgeEvent {
  constructor(public detailType: string, public gameTypeId: number) {}
}

/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import * as Nats from 'nats';
import * as Uuid from 'uuid';

export default class Transport {
  private connection: Nats.NatsConnection;

  private dataCodec: Nats.Codec<unknown>;

  constructor() {
    this.dataCodec = Nats.JSONCodec();
  }

  public get info() { return this.connection.info; }

  public async connect() {
    this.connection = await Nats.connect({
      servers: process.env.NATS_SERVER || 'nats://localhost:4222',
    });
    console.log(`Connected to NATS host ${this.connection.info?.host}:${this.connection.info?.port}`);
  }

  public async disconnect() {
    this.connection.drain();
  }

  public async publish(subject: string, data: unknown) {
    const replyId = Uuid.v4();

    const subscription = this.subscribe(replyId, { max: 1 });
    this.connection.publish(subject, this.dataCodec.encode(data), { reply: replyId });

    let decodedData: any;
    console.log(`listening for ${subscription.getSubject()} requests...`);
    for await (const m of subscription) {
      decodedData = this.dataCodec.decode(m.data);
      console.log(`Respond to ${subscription.getSubject()}: ${decodedData}`);
    }
    console.log(`subscription ${subscription.getSubject()} drained.`);

    return decodedData;
  }

  public subscribe(subject: string, opts?: Nats.SubscriptionOptions) {
    return this.connection.subscribe(subject, opts);
  }
}

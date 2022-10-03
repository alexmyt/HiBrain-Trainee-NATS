import { Subscription, JSONCodec, Codec } from 'nats';
import Transport from '@hibrain-trainee-nats/common/src/Transport';

export default abstract class Handler {
  private subject: string;

  private subscription: Subscription;

  private dataCodec: Codec<unknown>;

  private transport: Transport;

  constructor(transport: Transport, subject: string) {
    this.transport = transport;
    this.subject = subject;

    this.dataCodec = JSONCodec();
  }

  async listen() {
    this.subscription = this.transport.subscribe(this.subject);

    // eslint-disable-next-line no-restricted-syntax
    for await (const message of this.subscription) {
      const respond = await this.onMessage(this.dataCodec.decode(message.data));
      message.respond(this.dataCodec.encode(respond));
    }
  }

  // eslint-disable-next-line no-unused-vars
  abstract onMessage(message?: unknown): unknown;
}

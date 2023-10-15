import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server } from 'socket.io';

@WebSocketGateway(8081)
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    try {
      const message = await this.messagesService.create(createMessageDto);
      this.server.emit('createMessage', message);
    } catch (error) {
      this.server.emit('createMessage', { error: error.message });
    }
  }

  @SubscribeMessage('findAllMessages')
  async findAll() {
    const messages = await this.messagesService.findAll();
    this.server.emit('findAllMessages', messages);
  }

  @SubscribeMessage('findOneMessage')
  async findOne(@MessageBody() id: string) {
    const message = await this.messagesService.findOne(id);
    if (message) {
      this.server.emit('findOneMessage', message);
    } else {
      this.server.emit('findOneMessage', { error: 'Message not found' });
    }
  }

  @SubscribeMessage('updateMessage')
  async update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    try {
      const updatedMessage = await this.messagesService.update(
        String(updateMessageDto.id),
        updateMessageDto,
      );
      this.server.emit('updateMessage', updatedMessage);
    } catch (error) {
      this.server.emit('updateMessage', { error: error.message });
    }
  }

  @SubscribeMessage('removeMessage')
  async remove(@MessageBody() id: string) {
    try {
      const result = await this.messagesService.remove(id);
      this.server.emit('removeMessage', result);
    } catch (error) {
      this.server.emit('removeMessage', { error: error.message });
    }
  }
}

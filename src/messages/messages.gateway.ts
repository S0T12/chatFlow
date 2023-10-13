import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ObjectId } from 'typeorm';
import { Server } from 'socket.io';

@WebSocketGateway(8081)
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    console.log(
      'Received createMessage event with createMeesageDto:',
      createMessageDto,
    );
    const message = await this.messagesService.create(createMessageDto);

    if (message) {
      this.server.emit('createMessage', message);
    } else {
      this.server.emit('createMessage', 'Something is wrong');
    }
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    this.server.emit('findAllMessages', this.messagesService.findAll());
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: ObjectId) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }
}

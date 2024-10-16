import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';

@WebSocketGateway({ cors: {
  origin: 'http://localhost:5173',
  credentials: true,
} })
export class SocketGateway {
    constructor(private readonly socketService: SocketService) {}

    @SubscribeMessage('createSocket')
    created(@MessageBody() createSocketDto: CreateSocketDto) {
        return this.socketService.create(createSocketDto);
    }

    @SubscribeMessage("findAllSocket")
    findAll() {
        return this.socketService.findAll();
    }

    @SubscribeMessage('findOneSocket')
    findOne(@MessageBody() id: number){
        return this.socketService.findOne(id);
    }

    @SubscribeMessage("updateSocket")
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(
      updateSocketDto.id,
      updateSocketDto
    );
  }

  @SubscribeMessage("removeSocket")
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }
}
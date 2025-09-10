import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, // Precisamos disso para proteger rotas
  ParseUUIDPipe, // Para validar que o ID é um UUID
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport'; // Nossa guarda de segurança JWT

@Controller('events') // Todas as rotas aqui começam com /events
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // --- Rota Protegida ---
  @Post()
  @UseGuards(AuthGuard('jwt')) // APLICA A GUARDA: Só usuários com token válido podem passar
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  // --- Rota Pública ---
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  // --- Rota Pública ---
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.findOne(id);
  }

  // --- Rota Protegida ---
  @Patch(':id')
  @UseGuards(AuthGuard('jwt')) // APLICA A GUARDA
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  // --- Rota Protegida ---
  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) // APLICA A GUARDA
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.remove(id);
  }
}

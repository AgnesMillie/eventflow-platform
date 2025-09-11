import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard'; // 1. Importar a nova guarda
import { Roles } from 'src/auth/decorators/roles.decorator'; // 2. Importar o novo decorator
import { UserRole } from 'src/users/enums/user-role.enum'; // 3. Importar os papéis

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // --- Rota Protegida por Papel ---
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard) // 4. Usar AMBAS as guardas (primeiro JWT, depois Papéis)
  @Roles(UserRole.ORGANIZER) // 5. Especificar que SÓ um ORGANIZER pode aceder
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  // --- Rotas Públicas ---
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.findOne(id);
  }

  // --- Rota Protegida por Papel ---
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ORGANIZER)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  // --- Rota Protegida por Papel ---
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ORGANIZER)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.remove(id);
  }
}

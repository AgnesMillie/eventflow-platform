import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  create(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(event);
  }

  findAll() {
    return this.eventRepository.find();
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    // O 'preload' primeiro busca o evento e depois o atualiza com os novos dados.
    const event = await this.eventRepository.preload({
      id,
      ...updateEventDto,
    });
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return this.eventRepository.save(event);
  }

  async remove(id: string) {
    const event = await this.findOne(id); // Reutiliza o findOne para checar se existe
    await this.eventRepository.remove(event);
    return { message: `Event with ID "${id}" successfully removed` }; // Retorna uma confirmação
  }
}

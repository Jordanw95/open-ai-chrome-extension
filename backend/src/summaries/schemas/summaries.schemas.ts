import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SummaryDocument = Summary & Document;

@Schema({
  id: true,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Summary {
  @Prop()
  summary: string;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);

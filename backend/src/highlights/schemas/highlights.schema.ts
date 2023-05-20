import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HighlightDocument = Highlight & Document;

@Schema({
  id: true,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Highlight {
  @Prop()
  content: string;
}

export const HighlightSchema = SchemaFactory.createForClass(Highlight);

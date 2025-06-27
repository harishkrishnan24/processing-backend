import { Request, Response } from 'express';

import { StreamService } from '@/services/streams-service';

export class StreamController {
  static async getAllStreams(req: Request, res: Response) {
    const streams = await StreamService.getAllStreams();
    res.json(streams);
  }

  static async getStreamById(req: Request, res: Response) {
    const { id } = req.params;
    const stream = await StreamService.getStreamById(id);
    res.json(stream);
  }

  static async createStream(req: Request, res: Response) {
    const { data, options } = req.body;
    const stream = await StreamService.createStream(data, options);
    res.status(201).json(stream);
  }

  static async updateStream(req: Request, res: Response) {
    const { id } = req.params;
    const stream = await StreamService.updateStream(id, req.body);
    res.json(stream);
  }

  static async deleteStream(req: Request, res: Response) {
    const { id } = req.params;
    const stream = await StreamService.deleteStream(id);
    res.json(stream);
  }
}

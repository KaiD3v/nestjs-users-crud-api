import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";7

export class UserIdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){

      if(!(req.params.id)){
        throw new BadRequestException("Passa a porra do ID!")
      }

      next()
    }
}
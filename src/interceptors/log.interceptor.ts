import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import {tap} from 'rxjs/operators';

export class LogIniterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        
        const dt = Date.now()

        return next.handle().pipe(tap(() => {
            console.log(`execução levou: ${Date.now() - dt} milissegundos`)
        }))
        
    }
}
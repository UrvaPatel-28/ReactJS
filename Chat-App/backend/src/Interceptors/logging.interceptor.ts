import { CallHandler, ExecutionContext, Inject, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, map, tap } from "rxjs";




export class loggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

        const ctx = context.switchToHttp();
        const request: Request = ctx.getRequest<Request>();
        const response: Response = ctx.getResponse<Response>();

        const startTime = Date.now();


        return next.handle().pipe(
            map(data => {
                const endTime = Date.now();
                const resTime = endTime - startTime;

                const result = {
                    data: data,
                    isError: false,

                    message: response.statusMessage,
                    statusCode: response.statusCode,
                    time: `${resTime}ms`,
                    date: new Date().toISOString()
                }
                return result

                // const logData = {
                //     date: new Date(),
                //     statusCode: response.statusCode,
                //     userId: (request.user as any)?.payload?.id,
                //     path: request.url,
                //     responseTime: resTime,
                //     data: data
                // };


            }),
        );
    }




}
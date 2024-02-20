import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from "@nestjs/common"
import { Response, Request } from "express";
import * as fs from "fs";

import * as path from 'path'
import { LogsService } from "src/logs/logs.service";


@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject(LogsService) private readonly logService: LogsService) { }
    catch(exception: HttpException, host: ArgumentsHost): Record<string, any> {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const request: Request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const errorData: any = exception.getResponse();
        const error = exception.name;

        // console.log("errordata", errorData);

        const firstError = this.getFirstValidationError(errorData.message);
        const formattedErrors = this.formatValidationErrors(firstError);

        const baseData = {
            isError: true,
            error: error,
            timestamp: new Date().toISOString()
        }
        console.log(errorData);


        const data = {
            ...errorData, //whole msg object
            ...baseData, //whole basedata object
            message: formattedErrors, //overwite message 
        }
        const result = {
            date: new Date(),
            statusCode: errorData.statusCode,
            // userId : request.user.payload.,
            userId: (request.user as any)?.payload.id,
            path: request.url,
            data: data
        };

        // this.logService.addData(result)

        // this.writeHttpLog(data)
        return response.status(status).json(data)
    }

    //for getting first message
    private getFirstValidationError(errors: any): any | null {
        // Assuming `errors` is an array of validation errors
        return Array.isArray(errors) && errors.length > 0 ? errors[0] : errors;
    }

    //for converting error message in same format
    private formatValidationErrors(errors: any): string {
        return Array.isArray(errors) ? errors.join(', ') : errors;
    }





}//
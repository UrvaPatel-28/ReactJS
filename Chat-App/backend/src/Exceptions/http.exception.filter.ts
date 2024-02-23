import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from "@nestjs/common"
import { Response, Request } from "express";



@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {

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
        console.log("hii", errorData, request.url);


        const data = {
            ...errorData, //whole msg object
            ...baseData, //whole basedata object
            message: formattedErrors, //overwite message 
        }
        return response.status(status).json(data)
        // const result = {
        //     date: new Date(),
        //     statusCode: errorData.statusCode,
        //     // userId : request.user.payload.,
        //     userId: (request.user as any)?.payload.id,
        //     path: request.url,
        //     data: data
        // };
    }

    private getFirstValidationError(errors: any): any | null {
        return Array.isArray(errors) && errors.length > 0 ? errors[0] : errors;
    }

    //for converting error message in same format
    private formatValidationErrors(errors: any): string {
        return Array.isArray(errors) ? errors.join(', ') : errors;
    }





}//
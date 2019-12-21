import { AppErrorTypeEnum } from './AppErrorTypeEnum';
import { IErrorMessage } from './IErrorMessage';;
import { Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class AppError extends Error {
    public errorCode: AppErrorTypeEnum;
    public httpStatus: number;
    public errorMessage: string;
    public userMessage: string;
    constructor(errorCode: AppErrorTypeEnum) {
        super();
        const errorMessageConfig: IErrorMessage = this.getError(errorCode);
        if (!errorMessageConfig) throw new Error ('Unable to find error message');

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.httpStatus = errorMessageConfig.httpStatus;
        this.errorCode = errorCode;
        this.errorMessage = errorMessageConfig.errorMessage;
        this.userMessage = errorMessageConfig.userMessage;
    }
    
    private getError(errorCode: AppErrorTypeEnum): IErrorMessage {
        let res: IErrorMessage;
        
        switch (errorCode) {
            case AppErrorTypeEnum.USER_NOT_FOUND:
                res = {
                    type: AppErrorTypeEnum.USER_NOT_FOUND,
                    httpStatus: HttpStatus.NOT_FOUND,
                    errorMessage: 'User not found', 
                    userMessage: '用户名和密码不存在，请重试'
                };
                break;
            case AppErrorTypeEnum.USER_EXISTS:
                res = {
                    type: AppErrorTypeEnum.USER_EXISTS,
                    httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
                    errorMessage: 'User exists',
                    userMessage: '用户名已存在'
                };
                break;
            case AppErrorTypeEnum.NOT_IN_SESSION:
                res = {
                    type: AppErrorTypeEnum.NOT_IN_SESSION,
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    errorMessage: 'No Session',
                    userMessage: '用户未登陆'
                };
                break;
            case AppErrorTypeEnum.NO_USERS_IN_DB:
                res = {
                    type: AppErrorTypeEnum.NO_USERS_IN_DB,
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    errorMessage: 'Unauthorized',
                    userMessage: '用户无响应'
                };
                break;
            case AppErrorTypeEnum.WRONG_PASSWORD:
                res = {
                    type: AppErrorTypeEnum.WRONG_PASSWORD,
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    errorMessage: 'Wrong PassWord',
                    userMessage: '用户名或密码错误，请重试'
                }
        }
        return res;
    }
}

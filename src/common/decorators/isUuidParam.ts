import { HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

export function isUUIDParam(property: string): ParameterDecorator {
  return Param(
    property,
    new ParseUUIDPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      exceptionFactory: () => {
        return {
          statusCode: 400,
          message: 'Input is not a valid uuid',
        };
      },
    }),
  );
}

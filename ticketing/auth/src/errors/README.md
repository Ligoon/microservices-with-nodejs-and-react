All error responses that we send out from any server should have this structure. In each error file, we use `serializeErrors()` to transform the error array into the following common response srructure. Also, all the errors extend the `CustomError` abstract class from `custom-error.ts`.

**Common Response Structure**
```
{
  errors:{
    message: string, field?: string
  }[]
}
```
for example, for RequestValidationError:
```
{
  "errors": [
    {
      "message": "Email must be valid",
      "field": "email"
    }
  ]
}
```
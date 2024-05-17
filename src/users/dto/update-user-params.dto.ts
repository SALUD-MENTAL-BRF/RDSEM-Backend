import { IsNumberString, Validate } from "class-validator";
import { IsUserIdValidConstraint } from "../validations/is-user-id-valid.constraint";

export class UpdateUserParamsDto {
    @IsNumberString()
    @Validate(IsUserIdValidConstraint)
    id: number;
}
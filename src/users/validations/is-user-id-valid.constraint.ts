import { 
    ValidatorConstraintInterface,
    ValidatorConstraint,
    ValidationArguments,
} from "class-validator";
import { UsersService } from "../users.service";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({
    async:true
})
@Injectable()
export class IsUserIdValidConstraint implements ValidatorConstraintInterface {
    constructor(private usersService: UsersService) {}
    
    async validate(value: string): Promise<boolean> {
        const user = await this.usersService.findOne(+value);
        return Boolean(user)
    }

    defaultMessage(): string {
        return 'User ID is invalid'
    }
}
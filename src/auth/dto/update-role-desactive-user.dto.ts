/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/enums/roles.enum';

export class UserUpdatedRowsDto {
role?: Role
active?: boolean
razonBan?: string
}

export class  AdminActionDto {
  @IsNotEmpty()
  userFields: UserUpdatedRowsDto
}
export class UpdateRoleDesactiveUserDto {
  @IsNotEmpty()
  action: AdminActionDto
  @IsNotEmpty()
  id: string;

}

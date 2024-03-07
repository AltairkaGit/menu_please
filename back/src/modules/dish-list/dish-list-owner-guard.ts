import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { DishListService } from './dish-list.service';
import { AppError } from '@src/common/errors';

@Injectable()
export class DishListOwnerGuard implements CanActivate {
  constructor(
    private readonly dishListService: DishListService
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, body, params } = context.switchToHttp().getRequest();
    const dishListId = params.id ?? body.dishListId;
    const dishList = await this.dishListService.getPlainDishList(dishListId);
    if (!dishList) throw new BadRequestException(AppError.NO_DISH_LIST)
    if (dishList.ownerId != user.userId) return false;
    return true;
  }
}
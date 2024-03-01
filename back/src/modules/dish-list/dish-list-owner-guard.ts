import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { DishListService } from './dish-list.service';
import { AppError } from '@src/common/errors';

@Injectable()
export class DishListOwnerGuard implements CanActivate {
  constructor(
    private readonly dishListService: DishListService
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, body } = context.switchToHttp().getRequest();
    const { dishListId } = body;
    const dishList = await this.dishListService.getDishList(dishListId);
    if (!dishList) throw new BadRequestException(AppError.NO_DISH_LIST)
    if (dishList.ownerId != user.id) return false;
    return true;
  }
}
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { DishService } from '@src/modules/dish/dish.service';

@Injectable()
export class DishOwnerGuard implements CanActivate {
  constructor(
    private readonly dishService: DishService
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, body } = context.switchToHttp().getRequest();
    const { id } = body;
    const dish = await this.dishService.getDish(id);
    if (dish.cookerId != user.userId) return false;
    return true;
  }
}
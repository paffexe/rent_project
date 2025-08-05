import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();

    console.log(req);
    if (req.user.id != req.params.id) {
      throw new ForbiddenException(
        "Faqat shaxsiy ma'lumotlarni ko'rish mumkin"
      );
    }
    return true;
  }
}

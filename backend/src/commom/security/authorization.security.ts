import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        if (!req.headers.authorization) {
            return false;
        }

        const accessToken = req.headers.authorization.replace("Bearer ", "");
        const accessTokenDecoded: any = this.jwtService.decode(accessToken);
        if (accessTokenDecoded.type != "ACCESS")  {
            return false
        }

        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log(roles)
        console.log(accessTokenDecoded.role)
        const isHasPermission = roles.indexOf(accessTokenDecoded["role"]) >= 0
        if (!isHasPermission) {
            return false
        }

        req.userId = accessTokenDecoded.id
        return true;
    }

} 
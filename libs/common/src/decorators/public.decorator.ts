import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const PUBLIC_KEY: string = 'public';
export const Public = () => SetMetadata(PUBLIC_KEY, true);

export isPublic = (ctx: ExecutionContext, reflector: Reflector) => {
  const isPublic: boolean = reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [ctx.getHandler(), ctx.getClass()]);
  return isPublic;
};
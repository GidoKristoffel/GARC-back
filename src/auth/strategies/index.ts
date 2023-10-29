import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { GoogleStrategy } from '@auth/strategies/google.startegy';

export const STRATEGIES = [JwtStrategy, GoogleStrategy];
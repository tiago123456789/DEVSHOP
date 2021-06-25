import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EncryptUtil {

    async encode(value: string): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(value, salt);
    }

    compare(value: string, hash: string): Promise<any> {
        return bcrypt.compare(value, hash);
    }
}
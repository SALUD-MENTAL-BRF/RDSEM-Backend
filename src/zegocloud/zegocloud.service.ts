// src/zegocloud/zegocloud.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createCipheriv } from 'crypto';

enum ErrorCode {
  success = 0,
  appIDInvalid = 1,
  userIDInvalid = 3,
  secretInvalid = 5,
  effectiveTimeInSecondsInvalid = 6,
}

const enum KPrivilegeKey {
  PrivilegeKeyLogin = 1,
  PrivilegeKeyPublish = 2,
}

const enum KPrivilegeVal {
  PrivilegeEnable = 1,
  PrivilegeDisable = 0,
}

interface ErrorInfo {
  errorCode: ErrorCode;
  errorMessage: string;
}

function RndNum(a, b) {
  return Math.ceil(a + (b - a) * Math.random());
}

function makeNonce() {
  return RndNum(-2147483648, 2147483647);
}

function makeRandomIv(): string {
  const str = '0123456789abcdefghijklmnopqrstuvwxyz';
  const result = [];
  for (let i = 0; i < 16; i++) {
    const r = Math.floor(Math.random() * str.length);
    result.push(str.charAt(r));
  }
  return result.join('');
}

function getAlgorithm(keyBase64: string): string {
  const key = Buffer.from(keyBase64);
  switch (key.length) {
    case 16:
      return 'aes-128-cbc';
    case 24:
      return 'aes-192-cbc';
    case 32:
      return 'aes-256-cbc';
  }
  throw new HttpException('Invalid key length', HttpStatus.BAD_REQUEST);
}

function aesEncrypt(plainText: string, key: string, iv: string): ArrayBuffer {
  const cipher = createCipheriv(getAlgorithm(key), key, iv);
  cipher.setAutoPadding(true);
  const encrypted = cipher.update(plainText);
  const final = cipher.final();
  const out = Buffer.concat([encrypted, final]);
  return Uint8Array.from(out).buffer;
}

@Injectable()
export class ZegocloudService {
  generateToken04(
    appId: number,
    userId: string,
    secret: string,
    effectiveTimeInSeconds: number,
    payload?: string
  ): string {
    if (!appId || typeof appId !== 'number') {
      throw new HttpException(
        {
          errorCode: ErrorCode.appIDInvalid,
          errorMessage: 'appID invalid',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userId || typeof userId !== 'string') {
      throw new HttpException(
        {
          errorCode: ErrorCode.userIDInvalid,
          errorMessage: 'userId invalid',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!secret || typeof secret !== 'string' || secret.length !== 32) {
      throw new HttpException(
        {
          errorCode: ErrorCode.secretInvalid,
          errorMessage: 'secret must be a 32 byte string',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!effectiveTimeInSeconds || typeof effectiveTimeInSeconds !== 'number') {
      throw new HttpException(
        {
          errorCode: ErrorCode.effectiveTimeInSecondsInvalid,
          errorMessage: 'effectiveTimeInSeconds invalid',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const createTime = Math.floor(new Date().getTime() / 1000);
    const tokenInfo = {
      app_id: appId,
      user_id: userId,
      nonce: makeNonce(),
      ctime: createTime,
      expire: createTime + effectiveTimeInSeconds,
      payload: payload || '',
    };

    const plaintText = JSON.stringify(tokenInfo);
    console.log('plain text: ', plaintText);

    const iv: string = makeRandomIv();
    console.log('iv', iv);

    const encryptBuf = aesEncrypt(plaintText, secret, iv);

    const [b1, b2, b3] = [new Uint8Array(8), new Uint8Array(2), new Uint8Array(2)];
    new DataView(b1.buffer).setBigInt64(0, BigInt(tokenInfo.expire), false);
    new DataView(b2.buffer).setUint16(0, iv.length, false);
    new DataView(b3.buffer).setUint16(0, encryptBuf.byteLength, false);

    const buf = Buffer.concat([
      Buffer.from(b1),
      Buffer.from(b2),
      Buffer.from(iv),
      Buffer.from(b3),
      Buffer.from(encryptBuf),
    ]);

    return '04' + Buffer.from(buf).toString('base64');
  }
}

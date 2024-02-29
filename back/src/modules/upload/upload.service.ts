import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs'

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({
        region: this.configService.get('aws_s3_region')
    })

    constructor (private readonly configService: ConfigService) {}

    async uploadS3(filename: string, file: Buffer) : Promise<string> {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: 'nestjs-uploader',
                Key: filename,
                Body: file
            })
        );
        return `https://nestjs-uploader.s3.amazonaws.com/${filename}`
    }
    
    async uploadLocally(filename: string, file: Buffer) : Promise<string> {
        const path = `public/${filename}`;
        await fs.writeFile(path, file);
        return `http://${this.configService.get('host')}:${this.configService.get('port')}/${path}`;
    } 
}

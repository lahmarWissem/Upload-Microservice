import { UploadImageService } from './upload-image.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('upload-image')
export class UploadImageController {

    constructor(private readonly imageService: UploadImageService) { }


    @MessagePattern('uploadImage')
    async uploadImage(@Payload() data: any) {
        const { IdUser, data: base64EncodedImage } = data;
        const newImage = await this.imageService.uploadImage(base64EncodedImage, IdUser);
        return newImage;
    }

    @MessagePattern('loadImageByUserId')
    async loadImage(id: any) {
        const image = await this.imageService.loadImage(id);
        return { data: image.data };
    }

    @MessagePattern('updateImageByUserId')
    async updateImage(@Payload() data: any) {
        const { IdUser, base64EncodedImage } = data;
        let wh = base64EncodedImage;
        if (!base64EncodedImage) {
            throw new Error('No file provided');
        }
        const updatedImage = await this.imageService.updateImage(IdUser, wh);
        return updatedImage;
    }

    @MessagePattern('deleteImageByUserId')
    async deleteImage(id: string) {
        this.imageService.deleteImage(id);
    }



}

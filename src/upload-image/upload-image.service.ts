import { Image, ImageDocument } from './schemas/image.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UploadImageService {

    constructor( @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>) { }


    async uploadImage(base64EncodedImage: string, userId: string): Promise<Image> {
        const image = new this.imageModel({ IdUser: userId, data: base64EncodedImage });
        return await image.save();
      }


    async loadImage( userId: string): Promise<Image> {
        return await this.imageModel.findOne({IdUser: userId }).exec();
      }
    

    async updateImage(userId: string, newData: any): Promise<Image> {
      const image = await this.imageModel.findOneAndUpdate(
        { IdUser: userId },
        { data: newData },
        { new: true, uniqueIdentifier: true }
      );
      if (!image) {
        throw new Error('Image not found');
      }
      Image.updateImage(image, newData);
      return image;
    }
    
    
    async deleteImage(userId: string): Promise<void> {
         this.imageModel.findOneAndDelete({IdUser :userId}).exec();
    }
}

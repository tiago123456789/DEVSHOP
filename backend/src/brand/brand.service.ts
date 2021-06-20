import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BrandDto } from "./dto/brand.dto";
import { Brand } from "./brand.entity";
import { StorageInterface } from "src/commom/storage/storage.interface";
import * as fs from "fs";

@Injectable()
export class BrandService {

    constructor(
        @InjectRepository(Brand) private repository: Repository<Brand>,
        @Inject("Storage") private s3Storage: StorageInterface
    ) {
    }

    async uploadLogoBrand(id: string, filename: string, fileContent: string) {
        const location = await this.s3Storage.upload({
            filename: filename,
            fileContent: fileContent,
        });

        return this.repository.update(id, { image: location });
    }

    getById(id: string) {
        return this.repository.findOne({ id })
    }

    async getAll() {
        const registers = await this.repository.find({});
        return registers.map((item: Brand) => {
            // @ts-ignore
            return new BrandDto(item.id, item.name, item.image);
        })
    }

    create(brand: BrandDto) {
        return this.repository.save({
            name: brand.name
        });
    }

    remove(id: string) {
        return this.repository.delete(id);
    }

    update(id: string, dataModified: { [key: string]: any }) {
        delete dataModified.id;
        return this.repository.update({ id }, { name: dataModified.name });
    }
}
import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { ShortenURLDto } from './dtos/url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private repo: Repository<Url>,
    ) {}

    async shortenUrl(url:string, code:string) {
        const  longUrl  = url;
        const  urlCode  = code;
        console.log(longUrl)
        if (!isURL(longUrl)) {
            throw new BadRequestException('URL Not Valid!');
        }

        // const urlCode = nanoid(6);
        const baseURL = 'http://localhost:3000';

        try {
            let url = await this.repo.findOneBy({ longUrl });
            if (url) return url.shortUrl;
            const shortUrl = `${baseURL}/${urlCode}`;
            const createdAt = new Date();

            url = this.repo.create({
                urlCode,
                longUrl,
                shortUrl,
                createdAt
            });

            this.repo.save(url);
            return url.shortUrl;
        } catch (error) {
            console.log(error);
            throw new UnprocessableEntityException('Error');
        }
    }

    async findUrlByShortUrl(urlCode: string) {
        return await this.repo.findOneBy( { urlCode });
    }


    async redirect(urlCode: string) {
        try {
            const url = await this.repo.findOneBy({ urlCode });
            url.redirectCount++;
            await this.repo.update({id: url.id}, url);
            if (url) return url;
        } catch (error) {
            console.log(error);
            throw new NotFoundException('Error Not Found');
        }
    }

}

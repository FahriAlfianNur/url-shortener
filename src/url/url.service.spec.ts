import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { UrlService } from './url.service';
import { nanoid } from 'nanoid';
import { ShortenURLDto } from './dtos/url.dto';

describe('UrlService', () => {
    let urlService: UrlService;
    let urlRepository: Repository<Url>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UrlService,
                {
                    provide: getRepositoryToken(Url),
                    useClass: Repository,
                },
            ],
        }).compile();

        urlService = module.get<UrlService>(UrlService);
        urlRepository = module.get<Repository<Url>>(getRepositoryToken(Url));
    });

    describe('shortenUrl', () => {
        it('should create a new Url with a unique short URL', async () => {
            const longUrl = "https://www.google.com";
            const dto = new ShortenURLDto();
            dto.longUrl = longUrl;
            const shortUrl = nanoid(6);
            const spy = jest.spyOn(urlRepository, 'save').mockResolvedValueOnce({
                id: 1,
                longUrl,
                shortUrl,
                redirectCount: 0,
                createdAt: new Date(),
            } as Url);

            const result = await urlService.shortenUrl(dto);

            expect(spy).toHaveBeenCalledWith(expect.any(Url));
            expect(result).toMatchObject({ longUrl, shortUrl });
        });
    });

    describe('shortenUrl', () => {
        it('should create a new Url with a unique short URL', async () => {
            const longUrl = "https://www.google.com";
            const dto = new ShortenURLDto();
            dto.longUrl = longUrl;
            const shortUrl = nanoid(6);
            const spy = jest.spyOn(urlRepository, 'save').mockResolvedValueOnce({
                id: 1,
                longUrl,
                shortUrl,
                redirectCount: 0,
                createdAt: new Date(),
            } as Url);

            const result = await urlService.shortenUrl(dto);

            expect(spy).toHaveBeenCalledWith(expect.any(Url));
            expect(result).toMatchObject({ longUrl, shortUrl });
        });
    });
});

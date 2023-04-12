import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { ShortenURLDto } from './dtos/url.dto';
export declare class UrlService {
    private repo;
    constructor(repo: Repository<Url>);
    shortenUrl(url: ShortenURLDto): Promise<string>;
    findUrlByShortUrl(urlCode: string): Promise<Url>;
    redirect(urlCode: string): Promise<Url>;
}

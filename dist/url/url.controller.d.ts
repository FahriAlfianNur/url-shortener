import { UrlService } from './url.service';
import { ShortenURLDto } from './dtos/url.dto';
export declare class UrlController {
    private service;
    constructor(service: UrlService);
    shortenUrl(url: ShortenURLDto): Promise<{
        shortUrl: string;
    }>;
    redirect(res: any, code: string): Promise<any>;
    getUrlStats(code: string): Promise<{
        redirectCount: number;
        createdAt: Date;
    }>;
}

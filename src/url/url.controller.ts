import { Body, Controller, Get, Param, Post, Res, Req, RawBodyRequest  } from '@nestjs/common';
import { Request } from 'express';
import { UrlService } from './url.service';
import { ShortenURLDto } from './dtos/url.dto';

@Controller()
export class UrlController {
    constructor(private service: UrlService) {}

    @Post('shorten')
    async shortenUrl(
        @Req()
            req: Request

    ) {
        // console.log(req.body['urlCode'])
        const longUrl = req.body['longUrl'];
        const urlCode = req.body['urlCode'];
        const shortUrl = await this.service.shortenUrl(longUrl, urlCode);
        return {
            shortUrl: shortUrl,
        };
    }

    @Get(':code')
    async redirect(
        @Res() res,
        @Param('code')
            code: string,
    ) {
        const url = await this.service.redirect(code);

        return res.redirect(url.longUrl);
    }

    @Get(':code/stats')
    async getUrlStats(
        @Param('code')
            code: string
    ) {
        const url = await this.service.findUrlByShortUrl(code);
        return {
            redirectCount: url.redirectCount,
            createdAt: url.createdAt,
        };
    }
}

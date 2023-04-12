import { Body, Controller, Get, Param, Post, Res  } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenURLDto } from './dtos/url.dto';

@Controller()
export class UrlController {
    constructor(private service: UrlService) {}

    @Post('shorten')
    async shortenUrl(
        @Body()
            url: ShortenURLDto,
    ) {
        // return this.service.shortenUrl(url);
        const shortUrl = await this.service.shortenUrl(url);
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

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const url_entity_1 = require("./url.entity");
const nanoid_1 = require("nanoid");
const class_validator_1 = require("class-validator");
let UrlService = class UrlService {
    constructor(repo) {
        this.repo = repo;
    }
    async shortenUrl(url) {
        const { longUrl } = url;
        if (!(0, class_validator_1.isURL)(longUrl)) {
            throw new common_1.BadRequestException('URL Not Valid!');
        }
        const urlCode = (0, nanoid_1.nanoid)(6);
        const baseURL = 'http://localhost:3000';
        try {
            let url = await this.repo.findOneBy({ longUrl });
            if (url)
                return url.shortUrl;
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnprocessableEntityException('Error');
        }
    }
    async findUrlByShortUrl(urlCode) {
        return await this.repo.findOneBy({ urlCode });
    }
    async redirect(urlCode) {
        try {
            const url = await this.repo.findOneBy({ urlCode });
            url.redirectCount++;
            await this.repo.update({ id: url.id }, url);
            if (url)
                return url;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException('Error Not Found');
        }
    }
};
UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(url_entity_1.Url)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map
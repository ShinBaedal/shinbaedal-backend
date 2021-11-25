import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ResponseData } from 'src/shared/response/ResponseData';
import { MenuService } from './menu.service';
import { GetMenuResponse } from './response/get.menu';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get('/list/:store_id')
  async getMenu(
    @Param('store_id') storeId: number,
  ): Promise<ResponseData<GetMenuResponse[]>> {
    const menus: GetMenuResponse[] = await this.menuService.getMenus(storeId);
    return new ResponseData(HttpStatus.OK, '성공', menus);
  }
}

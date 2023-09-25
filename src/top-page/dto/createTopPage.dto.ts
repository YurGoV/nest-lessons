import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// import { topLevelCategory } from '../top-page.model/top-page.model';

export class CreateTopPageDto {
  @IsString()
  @ApiProperty({ example: 'topPage_title_string', description: 'the top page title' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 'category_exapmle', description: 'the top page category' })
  readonly category: string;
}

// export class FindTopPageDto {
//   firstCategory: topLevelCategory;
// }

import { SupportedGender } from '@path/models/enums/enums';

export const Gender = [
  {
    id: 0,
    name: SupportedGender.FEMALE,
    display_name: 'Nữ',
  },
  {
    id: 1,
    name: SupportedGender.MALE,
    display_name: 'Nam',
  },
  {
    id: 2,
    name: SupportedGender.LGBT,
    display_name: 'Giới tính thứ 3',
  },
  {
    id: 3,
    name: SupportedGender.NOT_DEFINED,
    display_name: 'Không xác định',
  },
];

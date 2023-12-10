import { $Enums } from '.prisma/client';

export interface IMob {
  id: string;
  name: {
    en: string;
    ua: string;
    ru: string;
  };
  description: {
    en: string;
    ua: string;
    ru: string;
  };
  type: $Enums.MobType;
}

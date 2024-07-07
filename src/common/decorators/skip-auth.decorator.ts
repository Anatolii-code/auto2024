import { SetMetadata } from '@nestjs/common';

import { SKIP_AUTH } from '../../modules/auth/constants/constants';

export const SkipAuth = () => SetMetadata(SKIP_AUTH, true);

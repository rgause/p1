import { ITenantType } from 'app/shared/model/tenant-type.model';

export interface ITenantTypeURL {
  id?: number;
  url?: string;
  tenantType?: ITenantType | null;
}

export const defaultValue: Readonly<ITenantTypeURL> = {};

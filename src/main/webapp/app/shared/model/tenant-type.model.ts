import { ITenantTypeURL } from 'app/shared/model/tenant-type-url.model';

export interface ITenantType {
  id?: number;
  name?: string;
  tenantTypeURLS?: ITenantTypeURL[] | null;
}

export const defaultValue: Readonly<ITenantType> = {};

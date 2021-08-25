import { ITenantProperty } from 'app/shared/model/tenant-property.model';
import { ITenantUser } from 'app/shared/model/tenant-user.model';
import { IWorkQueueTenant } from 'app/shared/model/work-queue-tenant.model';
import { ITenantType } from 'app/shared/model/tenant-type.model';

export interface ITenant {
  id?: number;
  name?: string;
  active?: boolean;
  tenantProperties?: ITenantProperty[] | null;
  tenantUsers?: ITenantUser[] | null;
  workQueueTenants?: IWorkQueueTenant[] | null;
  tenantType?: ITenantType | null;
}

export const defaultValue: Readonly<ITenant> = {
  active: false,
};

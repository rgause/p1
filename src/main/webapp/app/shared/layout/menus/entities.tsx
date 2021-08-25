import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/tenant-type">
      <Translate contentKey="global.menu.entities.tenantType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tenant">
      <Translate contentKey="global.menu.entities.tenant" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tenant-type-url">
      <Translate contentKey="global.menu.entities.tenantTypeUrl" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/url-type">
      <Translate contentKey="global.menu.entities.urlType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/url">
      <Translate contentKey="global.menu.entities.url" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tenant-property-key">
      <Translate contentKey="global.menu.entities.tenantPropertyKey" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tenant-property">
      <Translate contentKey="global.menu.entities.tenantProperty" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/lan-user">
      <Translate contentKey="global.menu.entities.lanUser" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tenant-user">
      <Translate contentKey="global.menu.entities.tenantUser" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/work-template">
      <Translate contentKey="global.menu.entities.workTemplate" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/work-template-item">
      <Translate contentKey="global.menu.entities.workTemplateItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/work-template-item-pre-req">
      <Translate contentKey="global.menu.entities.workTemplateItemPreReq" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/work-queue-tenant">
      <Translate contentKey="global.menu.entities.workQueueTenant" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/work-queue-tenant-data">
      <Translate contentKey="global.menu.entities.workQueueTenantData" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/work-queue-tenant-pre-req">
      <Translate contentKey="global.menu.entities.workQueueTenantPreReq" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/work-queue-tenant-user">
      <Translate contentKey="global.menu.entities.workQueueTenantUser" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/work-queue-tenant-user-data">
      <Translate contentKey="global.menu.entities.workQueueTenantUserData" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/work-queue-tenant-user-pre-req">
      <Translate contentKey="global.menu.entities.workQueueTenantUserPreReq" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

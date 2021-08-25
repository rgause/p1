import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './tenant-user.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const TenantUserDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const tenantUserEntity = useAppSelector(state => state.tenantUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tenantUserDetailsHeading">
          <Translate contentKey="p1App.tenantUser.detail.title">TenantUser</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{tenantUserEntity.id}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="p1App.tenantUser.active">Active</Translate>
            </span>
          </dt>
          <dd>{tenantUserEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="p1App.tenantUser.lanUser">Lan User</Translate>
          </dt>
          <dd>{tenantUserEntity.lanUser ? tenantUserEntity.lanUser.id : ''}</dd>
          <dt>
            <Translate contentKey="p1App.tenantUser.tenant">Tenant</Translate>
          </dt>
          <dd>{tenantUserEntity.tenant ? tenantUserEntity.tenant.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/tenant-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tenant-user/${tenantUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TenantUserDetail;

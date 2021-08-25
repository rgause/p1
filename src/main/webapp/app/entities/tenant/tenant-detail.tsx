import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './tenant.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const TenantDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const tenantEntity = useAppSelector(state => state.tenant.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tenantDetailsHeading">
          <Translate contentKey="p1App.tenant.detail.title">Tenant</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="p1App.tenant.name">Name</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.name}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="p1App.tenant.active">Active</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="p1App.tenant.tenantType">Tenant Type</Translate>
          </dt>
          <dd>{tenantEntity.tenantType ? tenantEntity.tenantType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/tenant" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tenant/${tenantEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TenantDetail;

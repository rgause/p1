import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './tenant-type-url.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const TenantTypeURLDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const tenantTypeURLEntity = useAppSelector(state => state.tenantTypeURL.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tenantTypeURLDetailsHeading">
          <Translate contentKey="p1App.tenantTypeURL.detail.title">TenantTypeURL</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{tenantTypeURLEntity.id}</dd>
          <dt>
            <span id="url">
              <Translate contentKey="p1App.tenantTypeURL.url">Url</Translate>
            </span>
          </dt>
          <dd>{tenantTypeURLEntity.url}</dd>
          <dt>
            <Translate contentKey="p1App.tenantTypeURL.tenantType">Tenant Type</Translate>
          </dt>
          <dd>{tenantTypeURLEntity.tenantType ? tenantTypeURLEntity.tenantType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/tenant-type-url" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tenant-type-url/${tenantTypeURLEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TenantTypeURLDetail;

import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './work-queue-tenant.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const WorkQueueTenantDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const workQueueTenantEntity = useAppSelector(state => state.workQueueTenant.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="workQueueTenantDetailsHeading">
          <Translate contentKey="p1App.workQueueTenant.detail.title">WorkQueueTenant</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{workQueueTenantEntity.id}</dd>
          <dt>
            <span id="task">
              <Translate contentKey="p1App.workQueueTenant.task">Task</Translate>
            </span>
          </dt>
          <dd>{workQueueTenantEntity.task}</dd>
          <dt>
            <span id="requiredToComplete">
              <Translate contentKey="p1App.workQueueTenant.requiredToComplete">Required To Complete</Translate>
            </span>
          </dt>
          <dd>{workQueueTenantEntity.requiredToComplete ? 'true' : 'false'}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="p1App.workQueueTenant.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            {workQueueTenantEntity.dateCreated ? (
              <TextFormat value={workQueueTenantEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateCancelled">
              <Translate contentKey="p1App.workQueueTenant.dateCancelled">Date Cancelled</Translate>
            </span>
          </dt>
          <dd>
            {workQueueTenantEntity.dateCancelled ? (
              <TextFormat value={workQueueTenantEntity.dateCancelled} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateCompleted">
              <Translate contentKey="p1App.workQueueTenant.dateCompleted">Date Completed</Translate>
            </span>
          </dt>
          <dd>
            {workQueueTenantEntity.dateCompleted ? (
              <TextFormat value={workQueueTenantEntity.dateCompleted} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="sequenceOrder">
              <Translate contentKey="p1App.workQueueTenant.sequenceOrder">Sequence Order</Translate>
            </span>
          </dt>
          <dd>{workQueueTenantEntity.sequenceOrder}</dd>
          <dt>
            <Translate contentKey="p1App.workQueueTenant.tenant">Tenant</Translate>
          </dt>
          <dd>{workQueueTenantEntity.tenant ? workQueueTenantEntity.tenant.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/work-queue-tenant" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/work-queue-tenant/${workQueueTenantEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WorkQueueTenantDetail;

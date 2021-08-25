import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './work-queue-tenant-user.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const WorkQueueTenantUserDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const workQueueTenantUserEntity = useAppSelector(state => state.workQueueTenantUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="workQueueTenantUserDetailsHeading">
          <Translate contentKey="p1App.workQueueTenantUser.detail.title">WorkQueueTenantUser</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{workQueueTenantUserEntity.id}</dd>
          <dt>
            <span id="task">
              <Translate contentKey="p1App.workQueueTenantUser.task">Task</Translate>
            </span>
          </dt>
          <dd>{workQueueTenantUserEntity.task}</dd>
          <dt>
            <span id="requiredToComplete">
              <Translate contentKey="p1App.workQueueTenantUser.requiredToComplete">Required To Complete</Translate>
            </span>
          </dt>
          <dd>{workQueueTenantUserEntity.requiredToComplete ? 'true' : 'false'}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="p1App.workQueueTenantUser.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            {workQueueTenantUserEntity.dateCreated ? (
              <TextFormat value={workQueueTenantUserEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateCancelled">
              <Translate contentKey="p1App.workQueueTenantUser.dateCancelled">Date Cancelled</Translate>
            </span>
          </dt>
          <dd>
            {workQueueTenantUserEntity.dateCancelled ? (
              <TextFormat value={workQueueTenantUserEntity.dateCancelled} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateCompleted">
              <Translate contentKey="p1App.workQueueTenantUser.dateCompleted">Date Completed</Translate>
            </span>
          </dt>
          <dd>
            {workQueueTenantUserEntity.dateCompleted ? (
              <TextFormat value={workQueueTenantUserEntity.dateCompleted} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="sequenceOrder">
              <Translate contentKey="p1App.workQueueTenantUser.sequenceOrder">Sequence Order</Translate>
            </span>
          </dt>
          <dd>{workQueueTenantUserEntity.sequenceOrder}</dd>
          <dt>
            <Translate contentKey="p1App.workQueueTenantUser.tenantUser">Tenant User</Translate>
          </dt>
          <dd>{workQueueTenantUserEntity.tenantUser ? workQueueTenantUserEntity.tenantUser.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/work-queue-tenant-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/work-queue-tenant-user/${workQueueTenantUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WorkQueueTenantUserDetail;

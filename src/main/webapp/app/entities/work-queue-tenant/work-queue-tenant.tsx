import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './work-queue-tenant.reducer';
import { IWorkQueueTenant } from 'app/shared/model/work-queue-tenant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const WorkQueueTenant = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const workQueueTenantList = useAppSelector(state => state.workQueueTenant.entities);
  const loading = useAppSelector(state => state.workQueueTenant.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="work-queue-tenant-heading" data-cy="WorkQueueTenantHeading">
        <Translate contentKey="p1App.workQueueTenant.home.title">Work Queue Tenants</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="p1App.workQueueTenant.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="p1App.workQueueTenant.home.createLabel">Create new Work Queue Tenant</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {workQueueTenantList && workQueueTenantList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="p1App.workQueueTenant.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenant.task">Task</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenant.requiredToComplete">Required To Complete</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenant.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenant.dateCancelled">Date Cancelled</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenant.dateCompleted">Date Completed</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenant.sequenceOrder">Sequence Order</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenant.tenant">Tenant</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workQueueTenantList.map((workQueueTenant, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${workQueueTenant.id}`} color="link" size="sm">
                      {workQueueTenant.id}
                    </Button>
                  </td>
                  <td>{workQueueTenant.task}</td>
                  <td>{workQueueTenant.requiredToComplete ? 'true' : 'false'}</td>
                  <td>
                    {workQueueTenant.dateCreated ? (
                      <TextFormat type="date" value={workQueueTenant.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {workQueueTenant.dateCancelled ? (
                      <TextFormat type="date" value={workQueueTenant.dateCancelled} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {workQueueTenant.dateCompleted ? (
                      <TextFormat type="date" value={workQueueTenant.dateCompleted} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{workQueueTenant.sequenceOrder}</td>
                  <td>
                    {workQueueTenant.tenant ? <Link to={`tenant/${workQueueTenant.tenant.id}`}>{workQueueTenant.tenant.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${workQueueTenant.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${workQueueTenant.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${workQueueTenant.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="p1App.workQueueTenant.home.notFound">No Work Queue Tenants found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WorkQueueTenant;

import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './work-queue-tenant-user.reducer';
import { IWorkQueueTenantUser } from 'app/shared/model/work-queue-tenant-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const WorkQueueTenantUser = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const workQueueTenantUserList = useAppSelector(state => state.workQueueTenantUser.entities);
  const loading = useAppSelector(state => state.workQueueTenantUser.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="work-queue-tenant-user-heading" data-cy="WorkQueueTenantUserHeading">
        <Translate contentKey="p1App.workQueueTenantUser.home.title">Work Queue Tenant Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="p1App.workQueueTenantUser.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="p1App.workQueueTenantUser.home.createLabel">Create new Work Queue Tenant User</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {workQueueTenantUserList && workQueueTenantUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="p1App.workQueueTenantUser.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenantUser.task">Task</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenantUser.requiredToComplete">Required To Complete</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenantUser.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenantUser.dateCancelled">Date Cancelled</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenantUser.dateCompleted">Date Completed</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenantUser.sequenceOrder">Sequence Order</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workQueueTenantUser.tenantUser">Tenant User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workQueueTenantUserList.map((workQueueTenantUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${workQueueTenantUser.id}`} color="link" size="sm">
                      {workQueueTenantUser.id}
                    </Button>
                  </td>
                  <td>{workQueueTenantUser.task}</td>
                  <td>{workQueueTenantUser.requiredToComplete ? 'true' : 'false'}</td>
                  <td>
                    {workQueueTenantUser.dateCreated ? (
                      <TextFormat type="date" value={workQueueTenantUser.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {workQueueTenantUser.dateCancelled ? (
                      <TextFormat type="date" value={workQueueTenantUser.dateCancelled} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {workQueueTenantUser.dateCompleted ? (
                      <TextFormat type="date" value={workQueueTenantUser.dateCompleted} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{workQueueTenantUser.sequenceOrder}</td>
                  <td>
                    {workQueueTenantUser.tenantUser ? (
                      <Link to={`tenant-user/${workQueueTenantUser.tenantUser.id}`}>{workQueueTenantUser.tenantUser.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${workQueueTenantUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${workQueueTenantUser.id}/edit`}
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
                        to={`${match.url}/${workQueueTenantUser.id}/delete`}
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
              <Translate contentKey="p1App.workQueueTenantUser.home.notFound">No Work Queue Tenant Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WorkQueueTenantUser;

import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './tenant-user.reducer';
import { ITenantUser } from 'app/shared/model/tenant-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const TenantUser = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const tenantUserList = useAppSelector(state => state.tenantUser.entities);
  const loading = useAppSelector(state => state.tenantUser.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="tenant-user-heading" data-cy="TenantUserHeading">
        <Translate contentKey="p1App.tenantUser.home.title">Tenant Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="p1App.tenantUser.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="p1App.tenantUser.home.createLabel">Create new Tenant User</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {tenantUserList && tenantUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="p1App.tenantUser.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.tenantUser.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.tenantUser.lanUser">Lan User</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.tenantUser.tenant">Tenant</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tenantUserList.map((tenantUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${tenantUser.id}`} color="link" size="sm">
                      {tenantUser.id}
                    </Button>
                  </td>
                  <td>{tenantUser.active ? 'true' : 'false'}</td>
                  <td>{tenantUser.lanUser ? <Link to={`lan-user/${tenantUser.lanUser.id}`}>{tenantUser.lanUser.id}</Link> : ''}</td>
                  <td>{tenantUser.tenant ? <Link to={`tenant/${tenantUser.tenant.id}`}>{tenantUser.tenant.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tenantUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tenantUser.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tenantUser.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="p1App.tenantUser.home.notFound">No Tenant Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TenantUser;

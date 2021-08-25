import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './tenant.reducer';
import { ITenant } from 'app/shared/model/tenant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Tenant = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const tenantList = useAppSelector(state => state.tenant.entities);
  const loading = useAppSelector(state => state.tenant.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="tenant-heading" data-cy="TenantHeading">
        <Translate contentKey="p1App.tenant.home.title">Tenants</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="p1App.tenant.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="p1App.tenant.home.createLabel">Create new Tenant</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {tenantList && tenantList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="p1App.tenant.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.tenant.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.tenant.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.tenant.tenantType">Tenant Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tenantList.map((tenant, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${tenant.id}`} color="link" size="sm">
                      {tenant.id}
                    </Button>
                  </td>
                  <td>{tenant.name}</td>
                  <td>{tenant.active ? 'true' : 'false'}</td>
                  <td>{tenant.tenantType ? <Link to={`tenant-type/${tenant.tenantType.id}`}>{tenant.tenantType.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tenant.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tenant.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tenant.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="p1App.tenant.home.notFound">No Tenants found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Tenant;

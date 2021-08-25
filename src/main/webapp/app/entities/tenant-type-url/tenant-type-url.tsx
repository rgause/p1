import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './tenant-type-url.reducer';
import { ITenantTypeURL } from 'app/shared/model/tenant-type-url.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const TenantTypeURL = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const tenantTypeURLList = useAppSelector(state => state.tenantTypeURL.entities);
  const loading = useAppSelector(state => state.tenantTypeURL.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="tenant-type-url-heading" data-cy="TenantTypeURLHeading">
        <Translate contentKey="p1App.tenantTypeURL.home.title">Tenant Type URLS</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="p1App.tenantTypeURL.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="p1App.tenantTypeURL.home.createLabel">Create new Tenant Type URL</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {tenantTypeURLList && tenantTypeURLList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="p1App.tenantTypeURL.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.tenantTypeURL.url">Url</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.tenantTypeURL.tenantType">Tenant Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tenantTypeURLList.map((tenantTypeURL, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${tenantTypeURL.id}`} color="link" size="sm">
                      {tenantTypeURL.id}
                    </Button>
                  </td>
                  <td>{tenantTypeURL.url}</td>
                  <td>
                    {tenantTypeURL.tenantType ? (
                      <Link to={`tenant-type/${tenantTypeURL.tenantType.id}`}>{tenantTypeURL.tenantType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tenantTypeURL.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tenantTypeURL.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${tenantTypeURL.id}/delete`}
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
              <Translate contentKey="p1App.tenantTypeURL.home.notFound">No Tenant Type URLS found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TenantTypeURL;

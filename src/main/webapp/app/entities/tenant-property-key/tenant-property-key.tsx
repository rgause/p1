import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './tenant-property-key.reducer';
import { ITenantPropertyKey } from 'app/shared/model/tenant-property-key.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const TenantPropertyKey = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const tenantPropertyKeyList = useAppSelector(state => state.tenantPropertyKey.entities);
  const loading = useAppSelector(state => state.tenantPropertyKey.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="tenant-property-key-heading" data-cy="TenantPropertyKeyHeading">
        <Translate contentKey="p1App.tenantPropertyKey.home.title">Tenant Property Keys</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="p1App.tenantPropertyKey.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="p1App.tenantPropertyKey.home.createLabel">Create new Tenant Property Key</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {tenantPropertyKeyList && tenantPropertyKeyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="p1App.tenantPropertyKey.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.tenantPropertyKey.name">Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tenantPropertyKeyList.map((tenantPropertyKey, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${tenantPropertyKey.id}`} color="link" size="sm">
                      {tenantPropertyKey.id}
                    </Button>
                  </td>
                  <td>{tenantPropertyKey.name}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tenantPropertyKey.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${tenantPropertyKey.id}/edit`}
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
                        to={`${match.url}/${tenantPropertyKey.id}/delete`}
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
              <Translate contentKey="p1App.tenantPropertyKey.home.notFound">No Tenant Property Keys found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TenantPropertyKey;

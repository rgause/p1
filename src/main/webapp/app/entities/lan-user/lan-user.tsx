import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './lan-user.reducer';
import { ILanUser } from 'app/shared/model/lan-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const LanUser = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const lanUserList = useAppSelector(state => state.lanUser.entities);
  const loading = useAppSelector(state => state.lanUser.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="lan-user-heading" data-cy="LanUserHeading">
        <Translate contentKey="p1App.lanUser.home.title">Lan Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="p1App.lanUser.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="p1App.lanUser.home.createLabel">Create new Lan User</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {lanUserList && lanUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="p1App.lanUser.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.lanUser.lanId">Lan Id</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.lanUser.pwpId">Pwp Id</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {lanUserList.map((lanUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${lanUser.id}`} color="link" size="sm">
                      {lanUser.id}
                    </Button>
                  </td>
                  <td>{lanUser.lanId}</td>
                  <td>{lanUser.pwpId}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${lanUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${lanUser.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${lanUser.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="p1App.lanUser.home.notFound">No Lan Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LanUser;

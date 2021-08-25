import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './work-template-item-pre-req.reducer';
import { IWorkTemplateItemPreReq } from 'app/shared/model/work-template-item-pre-req.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const WorkTemplateItemPreReq = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const workTemplateItemPreReqList = useAppSelector(state => state.workTemplateItemPreReq.entities);
  const loading = useAppSelector(state => state.workTemplateItemPreReq.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="work-template-item-pre-req-heading" data-cy="WorkTemplateItemPreReqHeading">
        <Translate contentKey="p1App.workTemplateItemPreReq.home.title">Work Template Item Pre Reqs</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="p1App.workTemplateItemPreReq.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="p1App.workTemplateItemPreReq.home.createLabel">Create new Work Template Item Pre Req</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {workTemplateItemPreReqList && workTemplateItemPreReqList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="p1App.workTemplateItemPreReq.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workTemplateItemPreReq.preRequisiteItem">Pre Requisite Item</Translate>
                </th>
                <th>
                  <Translate contentKey="p1App.workTemplateItemPreReq.workTemplateItem">Work Template Item</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workTemplateItemPreReqList.map((workTemplateItemPreReq, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${workTemplateItemPreReq.id}`} color="link" size="sm">
                      {workTemplateItemPreReq.id}
                    </Button>
                  </td>
                  <td>{workTemplateItemPreReq.preRequisiteItem}</td>
                  <td>
                    {workTemplateItemPreReq.workTemplateItem ? (
                      <Link to={`work-template-item/${workTemplateItemPreReq.workTemplateItem.id}`}>
                        {workTemplateItemPreReq.workTemplateItem.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${workTemplateItemPreReq.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${workTemplateItemPreReq.id}/edit`}
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
                        to={`${match.url}/${workTemplateItemPreReq.id}/delete`}
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
              <Translate contentKey="p1App.workTemplateItemPreReq.home.notFound">No Work Template Item Pre Reqs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WorkTemplateItemPreReq;

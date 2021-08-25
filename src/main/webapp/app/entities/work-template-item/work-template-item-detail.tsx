import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './work-template-item.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const WorkTemplateItemDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const workTemplateItemEntity = useAppSelector(state => state.workTemplateItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="workTemplateItemDetailsHeading">
          <Translate contentKey="p1App.workTemplateItem.detail.title">WorkTemplateItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{workTemplateItemEntity.id}</dd>
          <dt>
            <span id="task">
              <Translate contentKey="p1App.workTemplateItem.task">Task</Translate>
            </span>
          </dt>
          <dd>{workTemplateItemEntity.task}</dd>
          <dt>
            <span id="requiredToComplete">
              <Translate contentKey="p1App.workTemplateItem.requiredToComplete">Required To Complete</Translate>
            </span>
          </dt>
          <dd>{workTemplateItemEntity.requiredToComplete ? 'true' : 'false'}</dd>
          <dt>
            <span id="sequenceOrder">
              <Translate contentKey="p1App.workTemplateItem.sequenceOrder">Sequence Order</Translate>
            </span>
          </dt>
          <dd>{workTemplateItemEntity.sequenceOrder}</dd>
          <dt>
            <Translate contentKey="p1App.workTemplateItem.workTemplate">Work Template</Translate>
          </dt>
          <dd>{workTemplateItemEntity.workTemplate ? workTemplateItemEntity.workTemplate.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/work-template-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/work-template-item/${workTemplateItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WorkTemplateItemDetail;

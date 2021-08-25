import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IWorkTemplateItem } from 'app/shared/model/work-template-item.model';
import { getEntities as getWorkTemplateItems } from 'app/entities/work-template-item/work-template-item.reducer';
import { getEntity, updateEntity, createEntity, reset } from './work-template-item-pre-req.reducer';
import { IWorkTemplateItemPreReq } from 'app/shared/model/work-template-item-pre-req.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const WorkTemplateItemPreReqUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const workTemplateItems = useAppSelector(state => state.workTemplateItem.entities);
  const workTemplateItemPreReqEntity = useAppSelector(state => state.workTemplateItemPreReq.entity);
  const loading = useAppSelector(state => state.workTemplateItemPreReq.loading);
  const updating = useAppSelector(state => state.workTemplateItemPreReq.updating);
  const updateSuccess = useAppSelector(state => state.workTemplateItemPreReq.updateSuccess);

  const handleClose = () => {
    props.history.push('/work-template-item-pre-req');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getWorkTemplateItems({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...workTemplateItemPreReqEntity,
      ...values,
      workTemplateItem: workTemplateItems.find(it => it.id.toString() === values.workTemplateItemId.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...workTemplateItemPreReqEntity,
          workTemplateItemId: workTemplateItemPreReqEntity?.workTemplateItem?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="p1App.workTemplateItemPreReq.home.createOrEditLabel" data-cy="WorkTemplateItemPreReqCreateUpdateHeading">
            <Translate contentKey="p1App.workTemplateItemPreReq.home.createOrEditLabel">Create or edit a WorkTemplateItemPreReq</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="work-template-item-pre-req-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('p1App.workTemplateItemPreReq.preRequisiteItem')}
                id="work-template-item-pre-req-preRequisiteItem"
                name="preRequisiteItem"
                data-cy="preRequisiteItem"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="work-template-item-pre-req-workTemplateItem"
                name="workTemplateItemId"
                data-cy="workTemplateItem"
                label={translate('p1App.workTemplateItemPreReq.workTemplateItem')}
                type="select"
              >
                <option value="" key="0" />
                {workTemplateItems
                  ? workTemplateItems.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/work-template-item-pre-req" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WorkTemplateItemPreReqUpdate;

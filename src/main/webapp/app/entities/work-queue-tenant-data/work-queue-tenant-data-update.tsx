import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IWorkQueueTenant } from 'app/shared/model/work-queue-tenant.model';
import { getEntities as getWorkQueueTenants } from 'app/entities/work-queue-tenant/work-queue-tenant.reducer';
import { getEntity, updateEntity, createEntity, reset } from './work-queue-tenant-data.reducer';
import { IWorkQueueTenantData } from 'app/shared/model/work-queue-tenant-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const WorkQueueTenantDataUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const workQueueTenants = useAppSelector(state => state.workQueueTenant.entities);
  const workQueueTenantDataEntity = useAppSelector(state => state.workQueueTenantData.entity);
  const loading = useAppSelector(state => state.workQueueTenantData.loading);
  const updating = useAppSelector(state => state.workQueueTenantData.updating);
  const updateSuccess = useAppSelector(state => state.workQueueTenantData.updateSuccess);

  const handleClose = () => {
    props.history.push('/work-queue-tenant-data');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getWorkQueueTenants({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...workQueueTenantDataEntity,
      ...values,
      workQueueTenant: workQueueTenants.find(it => it.id.toString() === values.workQueueTenantId.toString()),
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
          ...workQueueTenantDataEntity,
          workQueueTenantId: workQueueTenantDataEntity?.workQueueTenant?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="p1App.workQueueTenantData.home.createOrEditLabel" data-cy="WorkQueueTenantDataCreateUpdateHeading">
            <Translate contentKey="p1App.workQueueTenantData.home.createOrEditLabel">Create or edit a WorkQueueTenantData</Translate>
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
                  id="work-queue-tenant-data-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('p1App.workQueueTenantData.data')}
                id="work-queue-tenant-data-data"
                name="data"
                data-cy="data"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('p1App.workQueueTenantData.type')}
                id="work-queue-tenant-data-type"
                name="type"
                data-cy="type"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="work-queue-tenant-data-workQueueTenant"
                name="workQueueTenantId"
                data-cy="workQueueTenant"
                label={translate('p1App.workQueueTenantData.workQueueTenant')}
                type="select"
              >
                <option value="" key="0" />
                {workQueueTenants
                  ? workQueueTenants.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/work-queue-tenant-data" replace color="info">
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

export default WorkQueueTenantDataUpdate;

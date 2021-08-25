import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITenantUser } from 'app/shared/model/tenant-user.model';
import { getEntities as getTenantUsers } from 'app/entities/tenant-user/tenant-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './work-queue-tenant-user.reducer';
import { IWorkQueueTenantUser } from 'app/shared/model/work-queue-tenant-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const WorkQueueTenantUserUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const tenantUsers = useAppSelector(state => state.tenantUser.entities);
  const workQueueTenantUserEntity = useAppSelector(state => state.workQueueTenantUser.entity);
  const loading = useAppSelector(state => state.workQueueTenantUser.loading);
  const updating = useAppSelector(state => state.workQueueTenantUser.updating);
  const updateSuccess = useAppSelector(state => state.workQueueTenantUser.updateSuccess);

  const handleClose = () => {
    props.history.push('/work-queue-tenant-user');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getTenantUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...workQueueTenantUserEntity,
      ...values,
      tenantUser: tenantUsers.find(it => it.id.toString() === values.tenantUserId.toString()),
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
          ...workQueueTenantUserEntity,
          tenantUserId: workQueueTenantUserEntity?.tenantUser?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="p1App.workQueueTenantUser.home.createOrEditLabel" data-cy="WorkQueueTenantUserCreateUpdateHeading">
            <Translate contentKey="p1App.workQueueTenantUser.home.createOrEditLabel">Create or edit a WorkQueueTenantUser</Translate>
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
                  id="work-queue-tenant-user-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('p1App.workQueueTenantUser.task')}
                id="work-queue-tenant-user-task"
                name="task"
                data-cy="task"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('p1App.workQueueTenantUser.requiredToComplete')}
                id="work-queue-tenant-user-requiredToComplete"
                name="requiredToComplete"
                data-cy="requiredToComplete"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('p1App.workQueueTenantUser.dateCreated')}
                id="work-queue-tenant-user-dateCreated"
                name="dateCreated"
                data-cy="dateCreated"
                type="date"
              />
              <ValidatedField
                label={translate('p1App.workQueueTenantUser.dateCancelled')}
                id="work-queue-tenant-user-dateCancelled"
                name="dateCancelled"
                data-cy="dateCancelled"
                type="date"
              />
              <ValidatedField
                label={translate('p1App.workQueueTenantUser.dateCompleted')}
                id="work-queue-tenant-user-dateCompleted"
                name="dateCompleted"
                data-cy="dateCompleted"
                type="date"
              />
              <ValidatedField
                label={translate('p1App.workQueueTenantUser.sequenceOrder')}
                id="work-queue-tenant-user-sequenceOrder"
                name="sequenceOrder"
                data-cy="sequenceOrder"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="work-queue-tenant-user-tenantUser"
                name="tenantUserId"
                data-cy="tenantUser"
                label={translate('p1App.workQueueTenantUser.tenantUser')}
                type="select"
              >
                <option value="" key="0" />
                {tenantUsers
                  ? tenantUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/work-queue-tenant-user" replace color="info">
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

export default WorkQueueTenantUserUpdate;

import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITenantType } from 'app/shared/model/tenant-type.model';
import { getEntities as getTenantTypes } from 'app/entities/tenant-type/tenant-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tenant.reducer';
import { ITenant } from 'app/shared/model/tenant.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const TenantUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const tenantTypes = useAppSelector(state => state.tenantType.entities);
  const tenantEntity = useAppSelector(state => state.tenant.entity);
  const loading = useAppSelector(state => state.tenant.loading);
  const updating = useAppSelector(state => state.tenant.updating);
  const updateSuccess = useAppSelector(state => state.tenant.updateSuccess);

  const handleClose = () => {
    props.history.push('/tenant');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getTenantTypes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...tenantEntity,
      ...values,
      tenantType: tenantTypes.find(it => it.id.toString() === values.tenantTypeId.toString()),
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
          ...tenantEntity,
          tenantTypeId: tenantEntity?.tenantType?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="p1App.tenant.home.createOrEditLabel" data-cy="TenantCreateUpdateHeading">
            <Translate contentKey="p1App.tenant.home.createOrEditLabel">Create or edit a Tenant</Translate>
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
                  id="tenant-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('p1App.tenant.name')}
                id="tenant-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('p1App.tenant.active')}
                id="tenant-active"
                name="active"
                data-cy="active"
                check
                type="checkbox"
              />
              <ValidatedField
                id="tenant-tenantType"
                name="tenantTypeId"
                data-cy="tenantType"
                label={translate('p1App.tenant.tenantType')}
                type="select"
              >
                <option value="" key="0" />
                {tenantTypes
                  ? tenantTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/tenant" replace color="info">
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

export default TenantUpdate;

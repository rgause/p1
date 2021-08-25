import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITenantType } from 'app/shared/model/tenant-type.model';
import { getEntities as getTenantTypes } from 'app/entities/tenant-type/tenant-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tenant-type-url.reducer';
import { ITenantTypeURL } from 'app/shared/model/tenant-type-url.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const TenantTypeURLUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const tenantTypes = useAppSelector(state => state.tenantType.entities);
  const tenantTypeURLEntity = useAppSelector(state => state.tenantTypeURL.entity);
  const loading = useAppSelector(state => state.tenantTypeURL.loading);
  const updating = useAppSelector(state => state.tenantTypeURL.updating);
  const updateSuccess = useAppSelector(state => state.tenantTypeURL.updateSuccess);

  const handleClose = () => {
    props.history.push('/tenant-type-url');
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
      ...tenantTypeURLEntity,
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
          ...tenantTypeURLEntity,
          tenantTypeId: tenantTypeURLEntity?.tenantType?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="p1App.tenantTypeURL.home.createOrEditLabel" data-cy="TenantTypeURLCreateUpdateHeading">
            <Translate contentKey="p1App.tenantTypeURL.home.createOrEditLabel">Create or edit a TenantTypeURL</Translate>
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
                  id="tenant-type-url-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('p1App.tenantTypeURL.url')}
                id="tenant-type-url-url"
                name="url"
                data-cy="url"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="tenant-type-url-tenantType"
                name="tenantTypeId"
                data-cy="tenantType"
                label={translate('p1App.tenantTypeURL.tenantType')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/tenant-type-url" replace color="info">
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

export default TenantTypeURLUpdate;

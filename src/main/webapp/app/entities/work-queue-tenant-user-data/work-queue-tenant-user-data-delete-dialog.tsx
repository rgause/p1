import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './work-queue-tenant-user-data.reducer';

export const WorkQueueTenantUserDataDeleteDialog = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const workQueueTenantUserDataEntity = useAppSelector(state => state.workQueueTenantUserData.entity);
  const updateSuccess = useAppSelector(state => state.workQueueTenantUserData.updateSuccess);

  const handleClose = () => {
    props.history.push('/work-queue-tenant-user-data');
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(workQueueTenantUserDataEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="workQueueTenantUserDataDeleteDialogHeading">
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="p1App.workQueueTenantUserData.delete.question">
        <Translate contentKey="p1App.workQueueTenantUserData.delete.question" interpolate={{ id: workQueueTenantUserDataEntity.id }}>
          Are you sure you want to delete this WorkQueueTenantUserData?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-workQueueTenantUserData" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkQueueTenantUserDataDeleteDialog;

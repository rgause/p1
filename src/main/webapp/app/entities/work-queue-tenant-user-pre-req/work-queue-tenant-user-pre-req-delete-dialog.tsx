import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './work-queue-tenant-user-pre-req.reducer';

export const WorkQueueTenantUserPreReqDeleteDialog = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const workQueueTenantUserPreReqEntity = useAppSelector(state => state.workQueueTenantUserPreReq.entity);
  const updateSuccess = useAppSelector(state => state.workQueueTenantUserPreReq.updateSuccess);

  const handleClose = () => {
    props.history.push('/work-queue-tenant-user-pre-req');
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(workQueueTenantUserPreReqEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="workQueueTenantUserPreReqDeleteDialogHeading">
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="p1App.workQueueTenantUserPreReq.delete.question">
        <Translate contentKey="p1App.workQueueTenantUserPreReq.delete.question" interpolate={{ id: workQueueTenantUserPreReqEntity.id }}>
          Are you sure you want to delete this WorkQueueTenantUserPreReq?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button
          id="jhi-confirm-delete-workQueueTenantUserPreReq"
          data-cy="entityConfirmDeleteButton"
          color="danger"
          onClick={confirmDelete}
        >
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkQueueTenantUserPreReqDeleteDialog;

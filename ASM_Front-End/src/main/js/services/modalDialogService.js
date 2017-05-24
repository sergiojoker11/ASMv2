'use strict';

angular.module('asm.modalDialogService', [])
        .factory('modalDialogService', function ($log, $timeout, $uibModal) {

    function closeDialog(pollingPromise) {
        if (angular.isDefined(pollingPromise)) {
            $timeout.cancel(pollingPromise);
        }
        $log.debug("Modal dialog closed", new Date());
    }

    function openModalInstance(templateUrl, controller, scope, setPromise) {
        var modalInstance = $uibModal.open({
            templateUrl: templateUrl,
            controller: controller,
            scope: scope,
            windowClass: "modal fade in",
            resolve: {
                promise: function () {
                    return setPromise;
                }
            }
        });

        return modalInstance.result;
    }
    
    function setUpConfirmationModal(dialogTitle, dialogQuestion){
        var confirmationModalData = {};
        confirmationModalData.dialogTitle = dialogTitle;
        confirmationModalData.dialogQuestion = dialogQuestion;
        return confirmationModalData;
    }

    return{
        openModalInstance: openModalInstance,
        closeDialog: closeDialog,
        setUpConfirmationModal: setUpConfirmationModal
    };
});


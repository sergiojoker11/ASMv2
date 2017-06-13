'use strict';

angular.module('asm.confirmationDialogController', [])
        .controller('confirmationDialogController', function ($scope, $uibModalInstance) {

    function accept(){
        $uibModalInstance.close();
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    $scope.cancel = cancel;
    $scope.accept = accept;
});


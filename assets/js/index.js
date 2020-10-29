$(document).ready(function() {
    swal.fire({
        title: '<strong><u>Info Corona</u></strong>',
        icon: 'info',
        html:
          'Les nouveaux et anciens abonnements sont automatiquement prolongé en cas, ' +
          '<b>confinement du aux COVID</b> (pas le delais de resiliation)',
        showCloseButton: true,
        focusConfirm: true,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> OK!',
        confirmButtonAriaLabel: 'OK!'
      })
});
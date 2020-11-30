const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

$(document).ready(function() {
    swalWithBootstrapButtons.fire({
        title: '<h3 class="font-alt font-w-600 title-md-extra-large title-lg-extra-large letter-spacing-2 m-0 mt-1 text-uppercase title-xs-large title-extra-large">Offre spéciale</h3>',
        html:
          '<h2 class="m-4"><span class="pricing-header bg-base-color-2 label mt-3 py-3 font-alt font-w-600 letter-spacing-2 text-uppercase text-white">'+
          '<img class="check-tarifs" src="assets/img/icon-awesome-crown.svg" alt=""> VIP</span></h2>'+
          '<h2 class="mt-4">599 au lieu de 749.-</h2>'+
          '<h3 class="mb-4 mt-1">or 59.- par mois</h3>',
        showCloseButton: true,
        width: 800,
        padding: '5em',
        background: '#fff url(assets/images/background/modaloferta_900.jpg) no-repeat fixed center',
        focusConfirm: true,
        confirmButtonText:
          'S’inscrire Maintenant',
        confirmButtonAriaLabel: 'OK!'
      }).then((result) => {
        if (result.isConfirmed) {
            window.open('https://lusine.gest-fit.ch/caddy_add_form.php?idabo=1012', '_blank');
          }
      })
});
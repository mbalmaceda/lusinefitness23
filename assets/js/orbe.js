const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

$(document).ready(function() {
  swalWithBootstrapButtons.fire({
    title: '<h1 class="m-4"><span class="bg-base-color-2 label mt-3 py-3 font-alt font-w-600 letter-spacing-2 text-uppercase text-white">'+
    '<img class="check-tarifs" src="assets/img/icon-awesome-crown.svg" alt=""> PROMO VIP <img class="check-tarifs" src="assets/img/icon-awesome-crown.svg" alt=""></span></h1>',
    html:
      '<h4 class="m-4 font-alt font-w-600 text-white letter-spacing-1 m-0 mt-1 text-uppercase">3 COACHING INCLUS </h4>'+
      '<h1 class="m-4 font-alt font-w-600 text-white letter-spacing-1 m-0 mt-1">69.- / mois </h1>'+
      '<h4 class="m-4 font-alt font-w-600 text-white letter-spacing-1 m-0 mt-1 text-uppercase">OU 699.- AU LIEU DE 799.- </h4>'+
      '<h6 class="mt-5"><span class="bg-base-color-2 label mt-3 py-3 font-alt font-w-600 letter-spacing-1 text-uppercase text-white">Valable jusqu\'au 31 janvier! </span></h6>',
    showCloseButton: true,
    showConfirmButton: false,
    width: 800,
    padding: '2em',
    background: 'black',
    background: 'url(assets/images/background/old-black-background.jpg)',
    focusConfirm: true,
    // confirmButtonText:
    //   'S’inscrire Maintenant',
    // confirmButtonAriaLabel: 'OK!'
  }).then((result) => {
    if (result.isConfirmed) {
        // window.open('https://lusine.gest-fit.ch/caddy_add_form.php?idabo=1012', '_blank');
      }
  })
});
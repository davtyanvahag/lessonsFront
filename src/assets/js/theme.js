
$( document ).ready(function() {
    //  Menu

    $('.uk-menu-open-btn').on('click', function(){
        $(this).toggleClass('active');
        $('.uk-menu-section').toggleClass('active');
        $('body').toggleClass('no-ovrf')
    });

    $('.uk-mobile-filter').on('click', function(){
        $('.mobile-filter-col').toggleClass('active');
        $('body').toggleClass('no-ovrf')
    });
    //  Mobile Filter
});


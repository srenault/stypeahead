(function($) {
    $.fn.stypeahead = function(options) {
        if(!$.fn.typeahead) throw new Error("Typeahead plugin required.");

        /*
         * Open select with full list.
         */
        $('.input-multiple button.select').on('click', function(e) {
            var $button = $(this),
                $inputMultiple = $button.closest('.input-multiple');

            if(!$button.is('.open')) {
                window.setTimeout(function() {
                    var $input = $inputMultiple.find('.hidden-autocomplete');
                    $input.focus();
                    $input.data('backup', $input.val());
                    $input.val('');
                    $input.typeahead('lookup');
                    $input.val($input.data('backup'));
                    $button.addClass('open');
                }, 100);
            } else {
                $button.removeClass('open');
            }
        });

        /*
         * Give text focus.
         */
        $('.input-multiple > ul').on('click', function() {
            $(this).find('.autocomplete').focus();
        });

        /*
         * Proxify keydown key.
         */
        $('.input-multiple .autocomplete').on('keydown', function(e) {
            var $autocomplete = $(this).closest('.input-multiple').find('.hidden-autocomplete');
            $autocomplete.trigger(e);
            if(e.keyCode == 13) e.preventDefault();
        });

        /*
         * Proxify keyup key.
         */
        $('.input-multiple .autocomplete').on('keyup', function(e) {
            var $input = $(this),
                $inputMultiple = $input.closest('.input-multiple'),
                $autocomplete = $inputMultiple.find('.hidden-autocomplete');

            $autocomplete.val($input.val());
            $autocomplete.trigger(e);

            var nbCar = $input.val().length;
            $input.attr("size",  nbCar ? nbCar * 1.5 : 1);
        });

        /*
         * Delete items with keyboard.
         */
        $('.input-multiple .autocomplete').on('keydown', function(e) {
            var $input = $(this),
                $item = $input.parent().prev('li'),
                $inputMultiple = $input.closest('.input-multiple');

            if(e.keyCode == 8 && !$input.val()) { //RETURN
                if($input.is('.confirm-delete')) {
                    $input.removeClass('confirm-delete');
                    $item.remove();
                    $inputMultiple.find('input[value=' + $item.data('item') + ']').remove();
                } else  {
                    $(this).addClass('confirm-delete');
                }
            } else {
                $input.removeClass('confirm-delete');
            }
        });

        /*
         * Remove the item.
         */
        $('body').on('click', '.input-multiple li:not(.new-item)', function(e) {
            var $item = $(this);
            $item.closest('.input').find('input[value=' + $item.data('item') + ']').remove();
            $item.remove();
        });

        /*
         * Close suggestions on clickout.
         */
        $('html').on('click', function(e) {
            $('.input-multiple button.select').removeClass('open');
            $('.dropdown-menu').hide();
        });

        // HERE WE GO !
        this.typeahead(options);
    };
})($);
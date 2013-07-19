$(document).ready(function() {
    $('.input-multiple .hidden-autocomplete').typeahead({
        menu: '<ul class="dropdown-menu select-tag"></ul>',
        source: ["butter", "sugar", "lemon"],
        updater: function(tag) {
            var $inputMultiple = this.$element.closest('.input-multiple'),
                $el = $inputMultiple.find('.autocomplete');
            $('<li class="added" data-item="'+ tag +'">' + tag + '</li>').insertBefore($el.parent());
            $inputMultiple.append('<input type="hidden" name="' + $el.attr('name') + '" value="'+ tag +'"/>');
            $el.val('');
            return '';
        },
        highlighter: function(v) { return v; },
        minLength: 0
    });
});
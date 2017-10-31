const { $ } = window;

/* FORMS */
$(document).ready(() => {
  // Text based inputs
  const inputSelector =
    `${['text', 'password', 'email', 'url',
      'tel', 'number', 'search', 'search-md']
      .map(selector =>
        `input[type=${selector}]`).join(', ')}, textarea`;

  const updateTextFields = function updateTextFields($input) {
    const $labelAndIcon = $input.siblings('label, i');
    const hasValue = $input.val().length;
    const hasPlaceholder = $input.attr('placeholder');
    // let isValid     = $input.validity.badInput === true;
    const addOrRemove = `${hasValue || hasPlaceholder ? 'add' : 'remove'}Class`;

    $labelAndIcon[addOrRemove]('active');
  };

  const validateField = function validateField($input) {
    if ($input.hasClass('validate')) {
      const value = $input.val();
      const noValue = !value.length;
      const isValid = !$input[0].validity.badInput;

      if (noValue && isValid) $input.removeClass('valid').removeClass('invalid'); else {
        const valid = $input.is(':valid');
        const length = +$input.attr('length') || 0;

        if (valid && (!length || length > value.length)) {
          $input
            .removeClass('invalid').addClass('valid');
        } else {
          $input
            .removeClass('valid').addClass('invalid');
        }
      }
    }
  };


    // Set active on labels and icons (DOM ready scope);
  $(inputSelector).each((index, input) => {
    const $this = $(input);
    const $labelAndIcon = $this.siblings('label, i');
    updateTextFields($this);
    const isValid = input.validity.badInput; // pure js
    if (isValid) $labelAndIcon.addClass('active');
  });

  // Add active when element has focus
  $(document).on('focus', inputSelector, (e) => {
    $(e.target).siblings('label, i').addClass('active');
  });

  // Remove active on blur when not needed or invalid
  $(document).on('blur', inputSelector, (e) => {
    const $this = $(e.target);
    const noValue = !$this.val();
    const invalid = !e.target.validity.badInput;
    const noPlaceholder = $this.attr('placeholder') === undefined;

    if (noValue && invalid && noPlaceholder) $this.siblings('label, i').removeClass('active');

    validateField($this);
  });

  // Add active if form auto complete
  $(document).on('change', inputSelector, (e) => {
    const $this = $(e.target);
    updateTextFields($this);
    validateField($this);
  });

  // Handle HTML5 autofocus
  $('input[autofocus]').siblings('label, i').addClass('active');

  // HTML form reset
  $(document).on('reset', (e) => {
    const $formReset = $(e.target);
    if ($formReset.is('form')) {
      const $formInputs = $formReset.find(inputSelector);
      // Reset inputs
      $formInputs.removeClass('valid').removeClass('invalid').each((index, input) => {
        const $this = $(input);
        const noDefaultValue = !$this.val();
        const noPlaceholder = !$this.attr('placeholder');
        if (noDefaultValue && noPlaceholder) $this.siblings('label, i').removeClass('active');
      });

      // Reset select
      $formReset.find('select.initialized').each((index, select) => {
        const $select = $(select);
        const $visibleInput = $select.siblings('input.select-dropdown');
        const defaultValue = $select.children('[selected]').val();

        $select.val(defaultValue);
        $visibleInput.val(defaultValue);
      });
    }
  });
});

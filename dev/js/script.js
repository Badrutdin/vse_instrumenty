if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

function dropdown($dropdown) {
  const parent = $dropdown.get(0);
  const title = parent.querySelector('.c-dropdown__title');
  const icon = parent.querySelector('.c-dropdown__icon');
  const closedHeight = title.offsetHeight + 'px';
  const openedHeight = parent.offsetHeight + 'px';
  if ($(parent).attr('data-is-open') === 'closed') {
    parent.style.maxHeight = closedHeight;
  }
  $(title).on('click', function () {
    if ($(parent).attr('data-is-open') === 'closed') {
      parent.style.maxHeight = openedHeight;
      $(parent).attr('data-is-open', 'opened')
      $(icon).addClass('c-dropdown__icon_opened')
    } else if ($(parent).attr('data-is-open') === 'opened') {
      parent.style.maxHeight = closedHeight;
      $(icon).removeClass('c-dropdown__icon_opened')
      $(parent).attr('data-is-open', 'closed')
    }
  })
}

function ajaxRender({$parent, targetAttribute, containerClass, activeClass, data}) {
  const storage = {}
  const $items = $parent.find('[' + targetAttribute + ']')
  const $textContainer = $parent.find('.' + containerClass)
  const active = activeClass
  $items.on('click', function (e) {
    e.preventDefault();
    const $item = $(this)
    let text;
    let key = $item.attr(targetAttribute);
    $.each($items, function (k, v) {
      $(v).removeClass(active, 200)
    })
    $item.addClass(active, 200)
    if (!storage[key]) {
      $.ajax({
        url: $(this).attr('href'),
        data: data,
        success: function (response) {
          text = response[key]['text'];
          storage[key] = text
          $textContainer.text(storage[key])
        }
      })
    } else {
      $textContainer.text(storage[key])
    }
  })
  $parent.find('.' + active).trigger('click')
}

function radioHandler({$parent, targetAttribute, containerClass, activeClass}) {
  const $labels = $parent.find('input[' + targetAttribute + ']').closest('label')
  const active = activeClass
  const $container = $parent.find('.' + containerClass)
  const display = $container.css('display')
  $labels.on('click', function () {
    const $label = $(this)
    let key = $label.find('input[' + targetAttribute + ']').attr(targetAttribute);
    console.log(key);

    $.each($('.' + containerClass), function (k, v) {
      if ($(v).attr('data-radio') !== key) {
        $(v).css({display: 'none'})
      } else {
        $(v).css({display: display})
      }
    })
    $.each($labels, function (k, v) {
      $(v).removeClass(active, 200)
    })
    $label.addClass(active, 200)
  })
  $parent.find('.' + active).trigger('click')
}

function hideToggler($hidden, $button) {
  const display = $hidden.css('display')
  const position = $button.offset()
  const height = $button.height()
  const left = position.left + 'px'
  const top = position.top + height + 30 + 'px'
  $hidden.css({left: left, top: top})
  if ($button.attr('data-is-visible') === 'false') {
    $hidden.css({display: 'none'})
  }
  $(document).on('click', function (e) {
    if (!$(e.target).attr('data-is-visible')) {
      $hidden.css({display: 'none'})
      $button.attr('data-is-visible', 'false')
    }
  })

  $button.on('click', function () {
    if ($(this).attr('data-is-visible') === 'false') {
      $hidden.css({display: display})
      $(this).attr('data-is-visible', 'true')
    } else if ($(this).attr('data-is-visible') === 'true') {
      $hidden.css({display: 'none'})
      $(this).attr('data-is-visible', 'false')
    }
  })

}

$(document).ready(function () {
  const $slider = $('.c-slider-container')
  const $hidden = $('.js-catalog');
  const $button = $('[data-is-visible]');
  const $dropdown = $('.c-dropdown');
  // background-image: url(images/6.png)
  $('.popup').magnificPopup({
    tClose: 'Закрыть',
    callbacks: {
      open: function () {
        const magnificPopup = $.magnificPopup.instance;
        const content = magnificPopup.content;
        const triggerEl = magnificPopup.ev;
        let bg = triggerEl.css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
        content.css({'background-image': 'url(' + bg + ')'})
      }
    },
  });
  if ($slider.length) {
    $slider.owlCarousel({
      autoWidth: true,
      dots: true,
      responsive: {
        640: {
          margin: 10
        },
        768: {
          margin: 20
        },
        1024: {
          margin: 24
        },
        1366: {
          margin: 28
        },
      }
    });
  }
  if ($button.length) {
    hideToggler($hidden, $button)
  }
  if ($dropdown.length) {
    $.each($dropdown, function () {
      dropdown($(this))
    })
  }
  ajaxRender({
    $parent: $('.c-product-review'),
    targetAttribute: 'data-text',
    containerClass: 'c-product-review__text',
    activeClass: 'c-product-review__item_active',
    data: {articul: 1234456734}
  })
  radioHandler({
    $parent: $('.c-order-form'),
    targetAttribute: 'data-radio',
    containerClass: 'delivery-method',
    activeClass: 'c-order-radio_active',
  })
})




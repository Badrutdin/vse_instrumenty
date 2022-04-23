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

function ajaxRender({$parent, targetAttribute, containerClass, activeClass, url, data}) {
  const storage = {}
  const $items = $parent.find('[' + targetAttribute + ']')
  const containerDefaultHeight = $parent.find('.' + containerClass).attr('offsetHeight')
  const $textContainer = $parent.find('.' + containerClass)
  const active = activeClass
  $items.on('click', function () {
    const $item = $(this)
    let text;
    let key = $item.attr(targetAttribute);
    $.each($items, function (k, v) {
      $(v).removeClass(active, 200)
    })
    $item.addClass(active, 200)
    if (!storage[key]) {
      $.ajax({
        url: url,
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
    if ($textContainer.attr('offsetHeight') > containerDefaultHeight) {
      $textContainer.css({overflow: 'scroll'})
    } else {
      $textContainer.css({overflow: 'auto'})
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

$(document).ready(function () {
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

  // hideToggler($('.js-catalog'), $('[data-is-visible]'))
  
  $.each($('.c-dropdown'), function () {
    dropdown($(this))
  })
  ajaxRender({
    $parent: $('.c-product-review'),
    targetAttribute: 'data-text',
    containerClass: 'c-product-review__text',
    activeClass: 'c-product-review__item_active',
    url: 'ajax/product-review.json',
    data: {articul: 1234456734}
  })
  radioHandler({
    $parent: $('.c-order-form'),
    targetAttribute: 'data-radio',
    containerClass: 'delivery-method',
    activeClass: 'c-order-radio_active',
  })
})




function filter($filter) {
  const parent = $filter.get(0);
  const title = parent.querySelector('.filter__title');
  const icon = parent.querySelector('.filter__icon');
  const closedHeight = title.offsetHeight + 'px';
  const openedHeight = parent.offsetHeight + 'px';
  if ($(parent).attr('data-is-open') === 'closed') {
    parent.style.maxHeight = closedHeight;
  }
  $(title).on('click', function () {
    if ($(parent).attr('data-is-open') === 'closed') {
      parent.style.maxHeight = openedHeight;
      $(parent).attr('data-is-open', 'opened')
      $(icon).addClass('filter__icon_opened')
    } else if ($(parent).attr('data-is-open') === 'opened') {
      parent.style.maxHeight = closedHeight;
      $(icon).removeClass('filter__icon_opened')
      $(parent).attr('data-is-open', 'closed')
    }
  })
}

$(document).ready(function () {
  $.each($('.filter'), function () {
    filter($(this))
  })
})

function ajaxRender({$parent, targetAttribute, containerClass, activeClass, url, data}) {
  const storage = {}
  const $items = $parent.find('[' + targetAttribute + ']')
  const $textContainer = $parent.find(containerClass)
  const active = activeClass
  $items.on('click', function () {
    const $item = $(this)
    let text;
    let key = $item.attr(targetAttribute);
    $.each($items, function (k, v) {
      $(v).removeClass(active,200)
    })
    $item.addClass(active,200)
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
  })
  $parent.find('.' + active).trigger('click')
}

ajaxRender({
  $parent: $('.c-product-review'),
  targetAttribute: 'data-text',
  containerClass: '.c-product-review__text',
  activeClass: 'c-product-review__item_active',
  url: 'ajax/product-review.json',
  data: {articul: 1234456734}
})


const filter = function ($filter) {
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

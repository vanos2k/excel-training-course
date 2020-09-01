import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const cords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let value;
  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - cords.right;
      value = cords.width + delta;
      $resizer.css({right: -delta + 'px'});
    } else {
      const delta = e.pageY - cords.bottom;
      value = cords.height + delta;
      $resizer.css({bottom: -delta + 'px'});
    }

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        $parent.css({width: value + 'px', height: 100 + '%'});
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(cell => cell.style.width = value + 'px');
      } else {
        $parent.css({height: value + 'px'});
      }
      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: '0px',
      });
    };
  };
}

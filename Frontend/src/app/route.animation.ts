import {
  trigger,
  transition,
  query,
  style,
  animate,
} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))],
      { optional: true }
    ),
  ]),
]);

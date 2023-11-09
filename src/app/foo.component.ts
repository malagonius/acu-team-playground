import { Component, Input, OnChanges, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Subject, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-foo',
  template: '{{titles$ | async | json}}',
})
export class FooComponent implements OnChanges {
  @Input() titles: string[] = [];

  private titlesSubject$ = new Subject<string[]>();

  private translocoService = inject(TranslocoService);

  titles$ = this.titlesSubject$.pipe(
    tap((titles) => console.log('foo component: before switchMap: ', titles)),
    // TODO: switchMap((titles) => titles.map((x) => this.translocoService.selectTranslate(x, {}, 'app'))),
    switchMap((titles) => of(titles)),
    tap((titles) => console.log('foo component: after switchMap: ', titles)),
  );

  ngOnChanges() {
    console.log('foo component: data binding', this.titles);

    this.titlesSubject$.next(this.titles);
  }
}

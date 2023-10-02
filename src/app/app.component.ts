import { Component, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // signal
  // React: const [counter, setCounter] = useState(1);
  // Vue: const counter = ref(1);
  counter = signal(1);
  anotherCounter = signal<number>(1);
  firstName = signal<string>('Guilherme');
  isTrue = signal<boolean>(true);
  obj = signal({ name: 'test' });
  array = signal([1, 2, 3]);

  // set, update e mutate
  // Estes 3 métodos servem para atualizar o valor de um signal.

  // O SET atualiza o signal com um novo valor: this.counter(1)
  // React: const increment = () => { setCounter(+1) }
  // Vue: const increment = () => { counter.value = +1 }
  increment() {
    this.counter.set(this.counter() + 1);
  }

  decrement() {
    this.counter.set(this.counter() - 1);
  }

  // O UPDATE atualiza o valor de modo que você tenha em mãos o valor anterior:
  // React: const increment = () => { setCounter(prev => prev + 1) }
  // Vue: const increment = () => { counter.value++ }
  increase() {
    this.counter.update((oldValue) => oldValue + 1);
  }

  decrease() {
    this.counter.update((oldValue) => oldValue - 1);
  }

  // O Mutate
  // Atualizando dados não primitivos do jeito errado.
  set() {
    const objModified = this.obj();
    objModified.name = 'modified';
    this.obj.set(objModified);

    this.array.update((currentArray) => {
      currentArray.push(4);
      return currentArray;
    });
  }

  // Jeito certo.
  mutate() {
    this.obj.mutate((currentObj) => {
      currentObj.name = 'modified';
    });

    this.array.mutate((currentArray) => {
      currentArray.push(4);
    });
  }

  // Effect
  // React: useEffect(() => { console.log(counter) }, [counter])
  // Vue: watch, watchEffect, watchAsyncEffect, watchPostEffect
  // watch(counter, (newCounter, oldCounter) => { console.log(newCounter) })
  constructor() {
    effect(() => {
      console.log('O Objeto mudou', this.obj());
    });
  }

  // Signal não substitui Observables e vice e versa, eles se complementam
  search = signal('');

  // Converter Signal em Observable
  search$ = toObservable(this.search);

  // users$ = this.search$.pipe(
  //   debounceTime(300),
  //   switchMap(search => this.userService.find(search))
  // )
  users$ = new Observable<[]>();

  // Converter um Observable em Signal
  users = toSignal(this.users$, { initialValue: [] });
}

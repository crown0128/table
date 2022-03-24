import React from 'react'
import {
  Getter,
  NoInfer,
  PropGetterValue,
  Renderable,
  TableState,
} from './types'

export type IsAny<T> = 0 extends 1 & T ? true : false
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>
export type Overwrite<T, U> = Omit<T, keyof U> & U

export type DataUpdateFunction<TInput, TOutput> = (input: TInput) => TOutput

export type Updater<TInput, TOutput> =
  | TOutput
  | DataUpdateFunction<TInput, TOutput>

export function functionalUpdate<TInput, TOutput = TInput>(
  updater: Updater<TInput, TOutput>,
  input: TInput
): TOutput {
  return typeof updater === 'function'
    ? (updater as DataUpdateFunction<TInput, TOutput>)(input)
    : updater
}

export function noop() {
  //
}

export function makeStateUpdater(key: keyof TableState, instance: unknown) {
  return (updater: Updater<any, any>) => {
    ;(instance as any).setState(<TTableState,>(old: TTableState) => {
      return {
        ...old,
        [key]: functionalUpdate(updater, (old as any)[key]),
      }
    })
  }
}

type AnyFunction = (...args: any) => any

export function isFunction<T extends AnyFunction>(d: any): d is T {
  return d instanceof Function
}

export function flattenBy<TNode>(
  arr: TNode[],
  getChildren: (item: TNode) => TNode[]
) {
  const flat: TNode[] = []

  const recurse = (subArr: TNode[]) => {
    subArr.forEach(item => {
      flat.push(item)
      const children = getChildren(item)
      if (children?.length) {
        recurse(children)
      }
    })
  }

  recurse(arr)

  return flat
}

type PropGetterImpl = <TBaseProps, TGetter extends Getter<TBaseProps>>(
  initial: TBaseProps,
  userProps?: TGetter
) => PropGetterValue<TBaseProps, TGetter>

// @ts-ignore // Just rely on the type, not the implementation
export const propGetter: PropGetterImpl = (initial, getter) => {
  if (isFunction(getter)) {
    return getter(initial)
  }

  return {
    ...initial,
    ...(getter ?? {}),
  }
}

export function memo<TDeps extends readonly any[], TResult>(
  getDeps: () => [...TDeps],
  fn: (...args: NoInfer<[...TDeps]>) => TResult,
  opts: {
    key: string
    debug?: boolean
    onChange?: (result: TResult, previousResult?: TResult) => void
  }
): () => TResult {
  let deps: any[] = []
  let result: TResult | undefined

  return () => {
    const newDeps = getDeps()

    const depsChanged =
      newDeps.length !== deps.length ||
      newDeps.some((dep: any, index: number) => deps[index] !== dep)

    if (depsChanged) {
      if (opts?.debug) {
        console.info(opts?.key, {
          length: `${deps.length} -> ${newDeps.length}`,
          ...newDeps
            .map((_, index) => {
              if (deps[index] !== newDeps[index]) {
                return [index, deps[index], newDeps[index]]
              }

              return false
            })
            .filter(Boolean)
            .reduce(
              (accu, curr: any) => ({
                ...accu,
                [curr[0]]: curr.slice(1),
              }),
              {}
            ),
          parent,
        })
      }

      let oldResult = result
      result = fn(...newDeps)
      deps = newDeps
      opts?.onChange?.(result, oldResult)

      oldResult = undefined
    }

    return result!
  }
}

export type Render = typeof flexRender

export function flexRender<TProps extends {}>(
  Comp: Renderable<TProps>,
  props: TProps
): React.ReactNode {
  return !Comp ? null : isReactComponent(Comp) ? <Comp {...props} /> : Comp
}

function isReactComponent(component: unknown): component is React.FC {
  return (
    isClassComponent(component) ||
    typeof component === 'function' ||
    isExoticComponent(component)
  )
}

function isClassComponent(component: any) {
  return (
    typeof component === 'function' &&
    (() => {
      const proto = Object.getPrototypeOf(component)
      return proto.prototype && proto.prototype.isReactComponent
    })()
  )
}

function isExoticComponent(component: any) {
  return (
    typeof component === 'object' &&
    typeof component.$$typeof === 'symbol' &&
    ['react.memo', 'react.forward_ref'].includes(component.$$typeof.description)
  )
}

// export function hashString(str: string, seed = 0): string {
//   let h1 = 0xdeadbeef ^ seed,
//     h2 = 0x41c6ce57 ^ seed
//   for (let i = 0, ch; i < str.length; i++) {
//     ch = str.charCodeAt(i)
//     h1 = Math.imul(h1 ^ ch, 2654435761)
//     h2 = Math.imul(h2 ^ ch, 1597334677)
//   }
//   h1 =
//     Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
//     Math.imul(h2 ^ (h2 >>> 13), 3266489909)
//   h2 =
//     Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
//     Math.imul(h1 ^ (h1 >>> 13), 3266489909)
//   return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString()
// }
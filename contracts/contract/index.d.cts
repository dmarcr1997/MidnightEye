import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
}

export type ImpureCircuits<T> = {
  addImage(context: __compactRuntime.CircuitContext<T>,
           hash_0: Uint8Array,
           owner_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  grantAccess(context: __compactRuntime.CircuitContext<T>,
              hash_0: Uint8Array,
              owner_0: Uint8Array,
              newUser_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  addImage(context: __compactRuntime.CircuitContext<T>,
           hash_0: Uint8Array,
           owner_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  grantAccess(context: __compactRuntime.CircuitContext<T>,
              hash_0: Uint8Array,
              owner_0: Uint8Array,
              newUser_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  images: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  access: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): {
      isEmpty(): boolean;
      size(): bigint;
      member(elem_0: Uint8Array): boolean;
      [Symbol.iterator](): Iterator<Uint8Array>
    }
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;

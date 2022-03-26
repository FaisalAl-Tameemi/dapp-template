/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface DAORouterInterface extends ethers.utils.Interface {
  functions: {
    "daoName()": FunctionFragment;
    "governanceTokenAddress()": FunctionFragment;
    "governorAddress()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "daoName", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "governanceTokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governorAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "daoName", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "governanceTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governorAddress",
    data: BytesLike
  ): Result;

  events: {};
}

export class DAORouter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: DAORouterInterface;

  functions: {
    daoName(overrides?: CallOverrides): Promise<[string]>;

    governanceTokenAddress(overrides?: CallOverrides): Promise<[string]>;

    governorAddress(overrides?: CallOverrides): Promise<[string]>;
  };

  daoName(overrides?: CallOverrides): Promise<string>;

  governanceTokenAddress(overrides?: CallOverrides): Promise<string>;

  governorAddress(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    daoName(overrides?: CallOverrides): Promise<string>;

    governanceTokenAddress(overrides?: CallOverrides): Promise<string>;

    governorAddress(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    daoName(overrides?: CallOverrides): Promise<BigNumber>;

    governanceTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    governorAddress(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    daoName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    governanceTokenAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    governorAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
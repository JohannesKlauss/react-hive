import {UseQueryResponse} from "urql/dist/types/hooks/useQuery";
import {Exchange} from "@urql/core";

export const hiveExchange: Exchange = ({ client, forward }) => {
  return operations$ => {
    // <-- The ExchangeIO function
    console.log('operations', operations$);

    const operationResult$ = forward(operations$);

    console.log('result', operationResult$);

    return operationResult$;
  };
};

export function useHive<T >(useUrqlQuery: () => UseQueryResponse<T>) {
  return useUrqlQuery();
}


import {renderHook} from "@testing-library/react-hooks";
import React from "react";
import {Provider, createClient, dedupExchange, cacheExchange, fetchExchange} from "urql";
import "isomorphic-unfetch";
import {GetStaticUserQuery, useGetStaticUserQuery} from "../src/graphql";
import {useHive} from "../src";
import {hiveExchange} from "../src/hiveExchange";

const expectedResult: GetStaticUserQuery = {
  user: {
    id: '1',
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    "__typename": "User",
  }
};

const client = createClient({
  url: 'https://graphqlzero.almansi.me/api',
  exchanges: [hiveExchange, dedupExchange, cacheExchange, fetchExchange]
});

const wrapper = ({children}: { children: React.FC }) => (
  <Provider value={client}>
    {children}
  </Provider>
);

describe('hiveExchange', () => {
  it('should execute a query just fine', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useHive(useGetStaticUserQuery), {wrapper});

    await waitForNextUpdate();

    console.log('result', result.current[0].data);

    expect(result.current[0].data).toEqual(expectedResult);
  });
});
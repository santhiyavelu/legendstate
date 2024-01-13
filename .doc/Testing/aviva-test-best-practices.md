Writing tests with Jest and React Native Testing Library (RNTL)
What is Jest (Opens in new window or tab)? - A general-purpose Javascript testing framework
What is React Native Testing Library (Opens in new window or tab)? - A lightweight solution to testing React components, used in conjunction with Jest
Pure functions, isolated utilities and pretty much anything that isn't React code can be tested solely with Jest

Take a base64Converter function located within a converter.ts file:
converter.ts

export const base64Converter = (value: string) =>
Buffer.from(value, 'utf8').toString('base64');
..for this, we create a converter.test.ts file for our tests:

converter.test.ts

import { base64Converter } from` `'./converter'``;

describe('base64Converter', () => {
it('should convert a string to base64', () => {
const encoded = base64Converter("livin' Aviva loca");
expect(encoded).toEqual("bGl2aW4nIEF2aXZhIGxvY2E=");
});
});
This makes a simple assertion that the function will produce some expected output based on some input.

If the function accepted more arguments, more types of argument, or contained more logical branches, we should seek to cover these in our tests. For example, if we were to throw an error if the function was provided with an argument that isn't a string, we would want test coverage of this (note that this is a hypothetical scenario - annotating the parameter type in this function is likely sufficient):

converter.ts

export const base64Converter = (value: string) => {
if (typeof value !== 'string') {
throw new Error('Value must be a string');
}
return Buffer.from(value, 'utf8').toString('base64');
};
converter.test.ts

describe('base64Converter', () => {
it("should convert a string to base64", () => {
const encoded = base64Converter("livin' Aviva loca");
expect(encoded).toEqual("bGl2aW4nIEF2aXZhIGxvY2E=");
});
it("should throw an error if the provided argument is not a string", () => {
expect(() => base64Converter(123)).toThrowError('Value must be a string');
});
});
Meaningful Failure

When writing tests, it's good to keep in mind the question: "can this test meaningfully fail?". That is, if the code we are testing were to break, or produce some output that was not intended, would our tests fail, and fail in a meaningful way?

Take for example a basic function that squares the number provided as an argument:

square.ts

const square = (n: number) => n \* n
..with a test like:

square.test.ts

describe('square', () => {
it("should square a provided number", () => {
const squared = square(3)
expect(typeof squared).toBe('number');
});
});
This will pass, and does test some aspect of square (that it returns a number), but importantly the test will not meaningfully fail if we break the function in certain ways. For example, if we changed the function to:

square.ts

const square = (n: number) => n + n
The function now adds the number to itself rather than squaring it, but the above test will pass because the return type is still a number. The test has not meaningfully failed in a way that informs us of some broken functionality.

We should refactor test like so:

square.test.ts

describe('square', () => {
it("should square a provided number", () => {
const squared = square(3)
expect(squared).toBe(9);
});
});
Now the test will fail in a way that is informative to us, and we can fix our broken square function so that the test passes.

Note that this is a contrived example, but serves to illustrate an important consideration when writing test suites - what are the failure states of the functionality under test, and do our tests capture them?

React components, hooks and screens should be tested with React Native Testing Library

For any React components, screens or code that resolves to some "UI", we need to use a framework on top of Jest to mount them in a testing environment. We're using React Native Testing Library (RNTL) (Opens in new window or tab) for this, which is similar to React Testing Library, only for React Native! The React/React-Native Testing Library ethos is:

"you want your tests to avoid including implementation details of your components and rather focus on making your tests give you the confidence for which they are intended"

What this means is we should seek to test user-centric features of the UI of our components (such as text, accessibility attributes, element roles), rather than developer-centric implementation details (such as test-id's, props, state). Testing based on the former means we can make changes to the latter (re-implementing our prop structure, business logic, etc.) without having to re-write our tests, making them more maintainable (see also: this article (Opens in new window or tab)). It also means we have more confidence that our tests validate the end-user experience, rather than simply the code we write. This aligns with the querying guidelines (Opens in new window or tab) of RNTL.

Let's look at an example of a component with some tests:

counter.tsx

export const Counter = ({ title }: { title: string }) => {
const [count, setCount] = React.useState(0);
const increment = () => {
setCount(count + 1);
};
return (
<>
<Text>{title}</Text>
<Text>Count: {count}</Text>
<Button onPress={increment}>Add one!</Button>
</>
);
};
It renders a title, a count number, and a button to increase this count by one. On the basis of this, we need our test suite to have coverage of the following aspects of the UI:

Does the component render with the provided title?
Does it render with an "Add one!" button?
Does a user pressing this button increment the count text by 1?
Our tests might therefore look something like this:

counter.test.tsx

describe("Counter", () => {
it("should render with the provided title", () => {
render(<Counter title="My counter"/>);

    expect(screen.getByText("My counter")).toBeOnTheScreen(); // ✅ best - explicitly tests the UI

    expect(screen.getByTestId("test:id/your-thing-in-kebab-case")).toBeOnTheScreen(); // ⚠️ should only be used as a fallback when other queries don't work - reliant on an implementation detail

});

it("should increment the count by 1 when the button is pressed", async () => {
render(<Counter title="My counter" />);

    expect(screen.getByText("Count: 0")).toBeOnScreen();

    const button = screen.getByText("Add one!");
    fireEvent.press(button);
    expect(screen.getByText("Count: 1")).toBeOnScreen(); // ✅ explicitly tests state change via the UI
    fireEvent.press(button);
    expect(screen.getByText("Count: 2")).toBeOnScreen();

});
});
With this set of tests, we have coverage of the 3 features of the UI previously mentioned. We achieved this by testing the UI directly (with getByText and fireEvent ), rather than any of the Counter internals - no accessing of the state or props. This test suite will also meaningfully fail if someone inadvertently breaks the Counter component - say, by accidentally incrementing the count by 2 on each press; our getByText 's will be unable to find matching text nodes (for "Count: 1" and "Count: 2"), and the test will fail such that we should be able to diagnose the issue.

✅ Prefer testing the UI directly with functions like getByText and fireEvent
✅ Ensure your tests will meaningfully fail if the functionality of the component is broken
⚠️ Avoid getByTestId where possible (though it will sometimes still be necessary). Use the following test ID format"test:id/{your-thing-in-kebab-case}". This is because it is mostly used for Automation/Accessibility. We do have a helper function getTestId we can use for formatting.
❌ Don't test props or state of components directly - these are implementation details. Test their effects on the UI: what text is present? What text was updated, and how?
RNTL queries and when to use them
Syntax Description
getBy (e.g. getByText ) throws an error if the element cannot be found, so can be used without jest expect - tests will still meaningfully fail
queryBy returns null if no element found, or the element instance if found. Does not throw - tests will not meaningfully fail by default
findBy returns a Promise that resolves to the element once it is found, or rejects if nothing found after 10s. Useful for testing async code/UI
All of above have "all" variants (e.g. getAllByText ), which return an array of matching elements.

Unit vs Integration testing
What is a unit test? - a test that verifies a single unit of functionality in isolation (i.e. testing a square function)

What is an integration test? - a test that verifies the functionality of multiple units working in unison (i.e. testing a component with multiple moving parts through the UI/user interaction)

Both unit tests and integration tests have value, but in the context of React Native and the testing of React components, screens and hooks, integration tests are generally to be preferred. These validate multiple pieces of functionality at once, and give us more confidence in our code as the tests more closely resemble how it's actually being used.

TLDR: we shouldn't be concerned about the internals of a component or hook

Testing React hooks
Tip: jest.mock can accept a type argument!

During a fix for a test issue, (the PR is here: https://dev.azure.com/avdigitalweb/DigitalNextGen/_git/DigitalNextGen/pullrequest/165904?_a=files (Opens in new window or tab)) it highlighted a neat trick to make your tests a bit more type safe.

Looking at the code before (below), nothing majorly seems amiss.

There is however an issue with the mock, where getReadableVersion is being mocked with an async function, but looking at the type definitions for react-native-device-info you see that it is actually synchronous

import {​ getReadableVersion }​ from 'react-native-device-info';
import {​ getAppInfoAnalytics }​ from '../app-info-service-analytics';

jest.mock('react-native-device-info', () => {​
return {​
getReadableVersion: async () => '1.0',
};
}​);

describe('setAppInfo', () => {​
it('should set the app info context keys', () => {​
const result = getAppInfoAnalytics();
expect(result.get('appPlatform')).toEqual('react');
expect(result.get('appBrand')).toEqual('aviva');
expect(result.get('appVersion')).toEqual(getReadableVersion());
expect(result.get('appLanguage')).toEqual('en_uk');
expect(result.get('appCountry')).toEqual('uk');
}​);
}​);
This is fairly easily missed error because when we do the expect, it compares the result to equal the returned value in the toEqual, so its synonymous to a Promise === Promise essentially, not really giving us the test confidence we want here.
Now here's the tip, by declaring the jest.mock with <typeof import('some-path-to-a-package')> we actually import the types of the module and declare that the mock we provide will be compatible with that interface, obviously you might only want to make a partial mock so generally you can do a jest.requireActual like below to import the rest of the module if you want to mock X methods but leave the others as real values.

import {​ getAppInfoAnalytics }​ from '../app-info-service-analytics';

jest.mock<typeof import('react-native-device-info')>(
'react-native-device-info',
() => {​
return {
...jest.requireActual('react-native-device-info'),
getReadableVersion: () => '1.0',
}​;
}​
);

describe('setAppInfo', () => {​
it('should set the app info context keys', () => {​
const result = getAppInfoAnalytics();
expect(result.get('appPlatform')).toEqual('react');
expect(result.get('appBrand')).toEqual('aviva');
expect(result.get('appVersion')).toEqual('1.0');
expect(result.get('appLanguage')).toEqual('en_uk');
expect(result.get('appCountry')).toEqual('uk');
}​);
});
However if you only care in that test about one method and want to provide an implementation for that, it's much easier to use Partial<typeof import('')> - by adding this type definition you would see a type error when you provide an async method to a sync method, and various other type issues you may encounter
So the final code becomes:

import {​ getAppInfoAnalytics }​ from '../app-info-service-analytics' ;

jest.mock<Partial<typeof import('react-native-device-info')>>(
'react-native-device-info',
() => {​
return {​
getReadableVersion: () =>'1.0',
};
}
);

describe('setAppInfo', () => {​
it('should set the app info context keys', () => {​
const result = getAppInfoAnalytics();
expect(result.get('appPlatform')).toEqual('react');
expect(result.get('appBrand')).toEqual('aviva');
expect(result.get('appVersion')).toEqual('1.0');
expect(result.get('appLanguage')).toEqual('en_uk');
expect(result.get('appCountry')).toEqual('uk'`);
}​);
});

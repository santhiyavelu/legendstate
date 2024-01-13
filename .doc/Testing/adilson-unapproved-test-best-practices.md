# Unit Testing

## Evaluating a ticket

Read and understand the User Story and Acceptance Criteria

Understand the perspective of the QA Testers, and ask for the ACs to be in the proper order

Plan out the logic required from the ticket

Plan out how you can test these features in the easiest way possible

## Tools available to us in the codebase for writing code/testing

### LegendApp

[Legend-State](https://github.com/LegendApp/legend-state) is a super fast and powerful state library for JavaScript apps. No boilerplate, no contexts, actions, reducers, dispatchers, sagas, thunks or epics. Just a simple syncronous api.

You call `.get()` to fetch the raw data, and `.set()` to change it.

Because we are using React, you can call `.use()` on any observable to get the raw data and automatically trigger a re-render when there's a value change.

you can find our use of the observable here: `src/common/interfaces/storage/index.ts` inside of which you will see examples of data persistance between sessions too.

a few example implementations:

```ts
// import the base library
import {observable} from '@legendapp/state';
// create an observable object with the initial value
export const count = observable<number>(0);

// setting the value
count.set(4);
// getting the value
count.get(); // 4 (this is syncronous)
// setting the value
count.set(currentVal => currentVal + 2);
count.get(); // 6

const Component = function Component() {
  // use() makes this component re-render whenever it changes
  const value = count.use();

  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={() => count.set(c => c + 1)}>increase</button>
    </div>
  );
};
```

### Jest

Jest Documentation can be found [here](https://jestjs.io/docs/getting-started)

### TestingLibrary/React-Native

testing library documentation can be found [here](https://callstack.github.io/react-native-testing-library/docs/getting-started)

## API Request Mocking

MANGA is a relatively large application with makes many calls to a large number of endpoints.
For the sake of development, we need the ability to mock api responses. Both inside of the tests and also inside of the application itself inside DevMode.

### The mock-api JSONs

This is where the mock-api's will be located: `src/api-mock/responses`

Inside of this, you will find a foldÌer for every API endpoint in use and inside of each folder you will find JSON files representing each relevant permutation of a response from that API endpoint.

#### Creating a Mock JSON

First, we will go to the desired enpoint that we wish to mock, for the purpose of this documentation, we will go with the Customer endpoint, that is fetched on the initial login.

The ticket requires us to find a customer with ABCD conditions, and one does not exist. So you should then get a standard user that is close to fulfilling the requirements, and duplicate this file, and make the changes to fulfil the tickets requirement conditions.

Once this JSON object exists and is created, ensure to import this file to the index of whichever folder represents the API endpoint and added to the exported object, in this case: `src/api-mock/responses/customer/V2/index.ts`.

> Please take care to set a sensible name for this user object for ease of searchability inside of the app

This new mocked response will now be able to be set inside of the DevMode menu `Dev Mode (top right) -> Set Standalone Responses` then select

### setMock

Breakdown of `setMock(endpoint, JSON name | payload)`

## Logic

### Separation of Concerns

Ensure that there is a proper separation of concerns, and to make use of tools such as `legendState` to prevent us from having unnessecary logic bleeding into places they don't belong.

e.g. If I am creating a popup that should show on startup, as long as the MFA popups are resolved, do not put MFA related code inside of the popup logic, and instead make it so that the functions responsible for the MFA popups set a flag to show that the new popup can be displayed.
[this can be seen here:](https://dev.azure.com/avdigitalweb/DigitalNextGen/_git/DigitalNextGen?path=/src/common/hooks/use-startup-action.ts&version=GBdevelop&line=71&lineEnd=72&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contents)
`src/common/hooks/use-startup-action.ts:71`

## How to write tests

### Avoid overcomplicating your tests

To ensure that tests are deterministic/pure, do your best to keep them simple.
Try not to write "code" in your tests, since this can create more avenues for bugs.

Keep the tests as simple as possible by following this simple flow:

1. set up environment
1. render the element
1. fire relevant user events
1. test outcomes

### An example

To ensure that our code does what it is supposed to do, and meet our requirements, we endorse the use of Test-Driven Development(TDD).

So, using the example of a new screen with buttons, we would first write out the tests that need to be satisfied:

```ts
const renderScreen = async (props?: ScreenViewProps) => {
  render(<ScreenView {...props} />);

  const header = await screen.findByText('Header Text as found in the design');
  const body = await screen.findByText('Body Text as found in the design');
  const button = await screen.findByRole('button', {
    name: 'CTA Text as stated in the design',
  });

  return {header, body, button};
};

describe('New Screen', () => {
  it('should render all items as desired', async () => {
    const {header, body, button} = await renderScreen();
    expect(header).toBeOnTheScreen();
    expect(body).toBeOnTheScreen();
    expect(button).toBeOnTheScreen();
  });

  it('should fire required actions on button click', async () => {
    const mockOnButtonClick = jest.fn();
    const {button} = await renderScreen({handleButtonClick: mockOnButtonClick});
    fireEvent.press(button);
    await waitFor(() => {
      expect(mockOnButtonClick).toHaveBeenCalled();
    });
  });
});
```

> Please note how the simple flow is maintained in the above use case.

And after this has been done, we should proceed to write code that satisfies the test cases that should cover the Acceptance Criteria.

### Tests MUST be deterministic

Make sure that each test has the proper setup and tear down process, there should not be a requirement for a test to be run in a specific order.

> Try to avoid setting mocks at the root level, always wrap them in a teardown or setup script e.g.
>
> ```ts
> imports...
>
> // bad
> jest.useFakeTimers();
>
> // good
> beforeEach(() => jest.useFakeTimers());
> afterEach(() => jest.useRealTimers());
>
> const mockTrackUserEvent = jest.fn();
> const mockTrackStateEvent = jest.fn();
>
> jest.mock('@hooks/use-analytics', () => ({
>   useAnalytics: () => ({
>     trackUserEvent: mockTrackUserEvent,
>     trackStateEvent: mockTrackStateEvent,
>   }),
> }));
> ```
>
> Try to avoid setting global `before*` or `after*` if you have multiple base describe blocks.

No test should rely on another test to be able to run correctly. This is important because the test runner in CI is not guaranteed to run all the tests in the order that they are in the file. So it is important for the tests you write to be Deterministic/Pure, meaning that the outcome is always going to be the same until the code is changed.

A deterministic test case should only change its output (from passing to failing or the reverse) because of changes in the production code it targets or changes in the test itself.

For example: If there is a test that has been passing for a period of time, but suddenly, without there being a change to the code the test is trying to cover, then there is a bug somewhere.

### Ensure that your tests validate what you think they do

This is an important aspect, your tests must match the user experience, even when using TDD, make sure to do it following the Behaviour-Driven Development approach. This prevents you from testing the wrong things.

```
Snenario: Logging into Aviva app
  Given I open a fresh install of the application
  And I click the login button
  And I enter correct login details
  And I click the login button
  Then I should be navigated to the Onboarding Flow where I am asked for Application Permissions
```

### Test what needs to be tested

You have a page, with a Call to action.

The call to action is a button.

When writing the test for this new page:

- Do not test that buttons have an onClick
- Do not test Props
- only test the code that you write, and that they do what you need them to do.

Testing the integrity of the button should be done on the unit test for the button, on the page itself, only test that the correct things have happened when interacting with the button.
e.g. analytics events, nagivation events, api requests

```ts
const renderScreen = async (props?: ScreenViewProps) => {
  render(<ScreenView {...props} />);
  const button = await screen.findByRole('button', {
    name: 'CTA Text as stated in the design',
  });
  return {button};
};

describe('New Screen', () => {
  describe('Call to Action', () => {
    it('should fire required actions on button click', async () => {
      const mockOnButtonClick = jest.fn();

      const mockTrackUserEvent = jest.fn();
      jest.mock('@hooks/use-analytics', () => ({
        useAnalytics: () => ({
          trackUserEvent: mockTrackUserEvent,
        }),
      }));

      const mockNavigate = jest.fn();
      jest.mock('@src/navigation/app/hooks', () => ({
        useAppStackNavigation: () => ({
          navigate: mockNavigate,
        }),
      }));

      const {button} = await renderScreen({
        handleButtonClick: mockOnButtonClick,
      });
      fireEvent.press(button);
      await waitFor(() => {
        expect(mockOnButtonClick).toHaveBeenCalledWith('test string');
        expect(mockTrackUserEvent).toHaveBeenCalledWith(
          'user event analytics string',
        );
        expect(mockNavigate).toHaveBeenCalledWith('new destination string');
      });
    });
  });
});
```

### querying elements

we make use of `@testing-library/react-native`, and so we have access to powerful [query tools](https://callstack.github.io/react-native-testing-library/docs/api-queries).

Be deliberate and sure with whichever query and predicate is used. And as much as possible, try to query userVisible attribute (e.g. the text on the screen as opposed to the testID/any other prop that is not visible/accessible to the user)

`getBy*` queries return the first matching node for a query, and throw an error if no elements match or if more than one match is found. If you need to find more than one element, then use `getAllBy*`.

`getAllBy*` queries return an array of all matching nodes for a query, and throw an error if no elements match.

`queryBy*` queries return the first matching node for a query, and return null if no elements match. This is useful for asserting an element that is not present. This throws if more than one match is found (use `queryAllBy*` instead).

`queryAllBy*` queries return an array of all matching nodes for a query, and return an empty array ([]) when no elements match.

`findBy*` queries return a promise which resolves when a matching element is found. The promise is rejected if no elements match or if more than one match is found after a default timeout of 1000 ms. If you need to find more than one element, then use `findAllBy*`.

`findAllBy*` queries return a promise which resolves to an array of matching elements. The promise is rejected if no elements match after a default timeout of 1000 ms.

> `queryBy*` vs `getBy*`: `getBy*` throws an error if the element is not found, while `queryBy*` returns `null` if the element is not found. So, if you're checking for the presence of an element that might not be there, use `queryBy*`. If you're certain the element should exist and want the test to fail if it doesn't, use `getBy*`.

> Because `finBy*` queries wrap the functionality of `waitFor` along with `getBy*` you have the ability to make use of `waitForOptions` which opens up a wonderful tool where you can pass the following: `onTimeout: () => { screen.debug(); }`

> A simple rule: if the element you are trying to query is not visible by default e.g.has to wait for an API response, you must use `findBy*`.

### simulating user events

documentation is [here](https://callstack.github.io/react-native-testing-library/docs/user-event)

The best practice, to ensure that the tests accurately portray what the user will be doing, is to ensure that all changes to the data/screen representation should be done by simulating user events, as opposed to manually calling functions, as best as possible.

### What to mock/how

Ideally, we should use as few mocks as possible in our tests, this prevents our tests from running slowly. When writing with TDD with the BDD mindset, we are able to quickly and effectively find out what we need to test, and what values we will need to be able to change to cover all the desired functionality.

Utilising this knowledge with the type of dependency injection provided by the MVVM pattern allows us to minimise the amount of mocks.

Of course, some things must be mocked, such as time. So be sure to properly make use of the included tooling, and clean up after the test process.

```ts
function getTimeStamp() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return ‘${hours}:${minutes}’
}

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('31 October 2022 01:00 IST').getTime());
})

afterAll(() => {
  jest.useRealTimers()
})

test('setting the formatted time', () => {
  expect(getTimestamp()).toEqual('14:32:19')
})
```

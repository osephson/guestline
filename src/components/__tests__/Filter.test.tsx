import { fireEvent, render, screen } from "@testing-library/react";

import Filter, { IFilterProps } from "../Filter";

const mock: IFilterProps = {
  data: {
    rating: 3,
    maxAdults: 3,
    maxChildren: 3,
  },
  onChange: jest.fn(() => {}),
};

test("render Filter info", () => {
  render(<Filter {...mock} />);

  expect(screen.getAllByTestId("StarIcon")).toHaveLength(mock.data.rating);
  expect(screen.getAllByRole("value")[0]).toHaveTextContent(
    mock.data.maxAdults + ""
  );
  expect(screen.getAllByRole("value")[1]).toHaveTextContent(
    mock.data.maxAdults + ""
  );
});

describe("onChange prop function is called when the filter is changed", () => {
  test("when the rating is changed", () => {
    render(<Filter {...mock} />);

    fireEvent.click(screen.getByText("5 Stars"));

    expect(mock.onChange).toBeCalled();
    expect(mock.onChange).toBeCalledTimes(1);
    expect(mock.onChange).toBeCalledWith({
      ...mock.data,
      rating: 5,
    });
  });

  test("when the number of max adults is changed", () => {
    render(<Filter {...mock} />);

    fireEvent.click(screen.getAllByRole("up")[0]);

    expect(mock.onChange).toBeCalled();
    expect(mock.onChange).toBeCalledTimes(1);
    expect(mock.onChange).toBeCalledWith({
      ...mock.data,
      maxAdults: mock.data.maxAdults + 1,
    });
  });

  test("when the number of max children is changed", () => {
    render(<Filter {...mock} />);

    fireEvent.click(screen.getAllByRole("up")[1]);

    expect(mock.onChange).toBeCalled();
    expect(mock.onChange).toBeCalledTimes(1);
    expect(mock.onChange).toBeCalledWith({
      ...mock.data,
      maxChildren: mock.data.maxChildren + 1,
    });
  });
});

import { render, screen, fireEvent } from "@testing-library/react";

import UpDown, { IUpDownProps } from "../UpDown";

const mock: IUpDownProps = {
  label: "upDownExample",
  value: 0,
  upperLimit: 3,
  lowerLimit: -3,
  onChange: jest.fn(() => {}),
};

test("render UpDown info", () => {
  render(<UpDown {...mock} />);
  expect(screen.getByText(mock.label)).toBeInTheDocument();
  expect(screen.getByText(mock.value)).toBeInTheDocument();
});

describe("onChange prop function is called when the value is changed", () => {
  test("called with an increased value when '+' button is clicked", () => {
    render(<UpDown {...mock} />);
    fireEvent.click(screen.getByRole("up"));

    expect(mock.onChange).toBeCalled();
    expect(mock.onChange).toBeCalledTimes(1);
    expect(mock.onChange).toBeCalledWith(mock.value + 1);
  });

  test("called with an decreased value when '-' button is clicked", () => {
    render(<UpDown {...mock} />);
    fireEvent.click(screen.getByRole("down"));

    expect(mock.onChange).toBeCalled();
    expect(mock.onChange).toBeCalledTimes(1);
    expect(mock.onChange).toBeCalledWith(mock.value - 1);
  });
});

describe("onChange function is not called when the value reaches out to the limit", () => {
  test("when the value reaches out to the upper limit", () => {
    const valueWithUpperlimit = {
      ...mock,
      upperLimit: 3,
      value: 3,
    };
    render(<UpDown {...valueWithUpperlimit} />);
    fireEvent.click(screen.getByRole("up"));

    expect(mock.onChange).not.toBeCalled();
  });

  test("when the value reaches out to the lower limit", () => {
    const valueWithUpperlimit = {
      ...mock,
      lowerLimit: -3,
      value: -3,
    };
    render(<UpDown {...valueWithUpperlimit} />);
    fireEvent.click(screen.getByRole("down"));

    expect(mock.onChange).not.toBeCalled();
  });
});
